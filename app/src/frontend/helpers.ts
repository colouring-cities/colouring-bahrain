import isEqual from 'lodash.isequal';

function sanitiseURL(string: string): string | null {
  let url: URL;

  // http or https
  if (!(string.substring(0, 7) === 'http://' || string.substring(0, 8) === 'https://')){
      return null;
  }

  // The WHATWG URL API is standard in both modern browsers and Node.js.
  // This avoids using browser-specific objects like `document` on the server.
  try {
    url = new URL(string);
  } catch (error) {
    // The URL constructor will throw if the URL is malformed.
    return null;
  }

  // required (www.example.com)
  if (!url.hostname || url.hostname === '' || url.hostname === 'localhost'){
      return null;
  }

  // optional (/some/path)
  // url_.pathname;

  // optional (?name=value)
  // url_.search;

  // optional (#anchor)
  // url_.hash;

  return url.href;
}

/**
 * Transform an array of objects into a dictionary of arrays of objects,
 * where the objects are grouped into arrays given an arbitrary key function
 * that gives a key for each object.
 * @param arr array of objects to group
 * @param keyAccessor function returning the grouping key for each object in the original array
 */
function arrayToDictionary<T>(arr: T[], keyAccessor: (obj: T) => string): {[key: string]: T[]} {
    return arr.reduce((obj, item) => {
        (obj[keyAccessor(item)] = obj[keyAccessor(item)] || []).push(item);
        return obj;
    }, {});
}

/**
 * Parse a string containing an ISO8601 formatted date
 * @param isoUtcDate a date string in ISO8601 format, assuming UTC
 * @returns a JS Date object with the UTC time encoded
 */
function parseDate(isoUtcDate: string): Date {
    // The Date constructor can parse ISO 8601 strings directly.
    // This is more robust than a regex and handles variations in the format.
    const date = new Date(isoUtcDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        // Or throw an error, depending on desired behavior
        return null;
    }

    return date;
}

function compareObjects<T extends Record<string, any>>(objA: T, objB: T): [Partial<T>, Partial<T>] {
    const reverse: Partial<T> = {};
    const forward: Partial<T> = {};
    for (const [key, value] of Object.entries(objB)) {
        const keyTyped = key as keyof T;
        if (!isEqual(objA[keyTyped], value)) {
            reverse[keyTyped] = objA[keyTyped];
            forward[key] = value;
        }
    }
    return [forward, reverse];
}

export {
  sanitiseURL,
  arrayToDictionary,
  parseDate,
  compareObjects
};
