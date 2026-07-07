type JsonReviver = (name: string, value: any) => any;

/** Treat as JSON body (GeoJSON is often served as application/geo+json). */
function isJsonLikeContentType(contentType: string): boolean {
    const ct = contentType.toLowerCase();
    return (
        ct.includes("application/json") ||
        ct.includes("application/geo+json") ||
        ct.includes("application/vnd.geo+json")
    );
}

// Relative `/api/...` in browser when unset. Avoid `import.meta` (Webpack ImportMetaPlugin / CI).
const API_BASE = (typeof window !== "undefined" && window.__APP_API_URL__) || "";

export class ApiError extends Error {
    status: number;
    body: string;
    constructor(message: string, status: number, body: string) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

export function apiGet(path: string, options?: { jsonReviver?: JsonReviver }) {
    return apiRequest(path, "GET", null, options);
}

export function apiPost(path: string, data?: object, options?: { jsonReviver?: JsonReviver }) {
    return apiRequest(path, "POST", data, options);
}

export function apiDelete(path: string, options?: { jsonReviver?: JsonReviver }) {
    return apiRequest(path, "DELETE", null, options);
}

async function apiRequest(
    path: string,
    method: "GET" | "POST" | "DELETE",
    data?: object,
    options?: { jsonReviver?: JsonReviver }
): Promise<any> {
    const fetchOptions: RequestInit = {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json, application/geo+json, */*",
        },
    };

    if (data && method !== "GET") {
        fetchOptions.body = JSON.stringify(data);
    }

    const res = await fetch(API_BASE + path, fetchOptions);

    // handle redirects (optional)
    if (res.status >= 300 && res.status < 400) {
        return { ok: true, redirected: true };
    }

    if (res.status === 204) return null;

    const contentType = res.headers.get("content-type") || "";

    // 1. Check for Server Success
    if (!res.ok) {
        // For 404 and other client errors, return null instead of throwing
        // This prevents uncaught promise rejections
        // Silently handle 404s for geometries (expected to be missing for some deployments)
        if (res.status === 404) {
            // Don't log 404s for geometry files - they're expected to be missing
            if (!path.includes('/geometries/')) {
                console.warn(`Resource not found: ${path}`);
            }
            return null;
        }
        if (res.status >= 400 && res.status < 500) {
            return null;
        }
        // For server errors (500+), try to get JSON if available
        if (isJsonLikeContentType(contentType)) {
            try {
                const errorJson = await res.json();
                // Only throw for server errors, not client errors
                if (res.status >= 500) {
                    throw new ApiError(`API request failed with status ${res.status}`, res.status, JSON.stringify(errorJson));
                }
                return null;
            } catch (e) {
                if (e instanceof ApiError) throw e;
                // If JSON parsing fails, return null
                return null;
            }
        }
        // If server sent HTML error page or other content, return null
        return null;
    }

    // 2. Accept JSON and GeoJSON media types (static .geojson often uses application/geo+json)
    if (!isJsonLikeContentType(contentType)) {
        if (contentType.includes("text/html")) {
            return null;
        }
        console.warn(`Unexpected content type: ${contentType} for path: ${path}`);
        return null;
    }

    // 3. The "Safe Parse" block
    try {
        const json = await res.json();
        return options?.jsonReviver ? JSON.parse(JSON.stringify(json), options.jsonReviver) : json;
    } catch (e) {
        console.error("SyntaxError: The server sent bad JSON. Check server logs.");
        return null; // Prevents the 'Unexpected token <' crash
    }
}