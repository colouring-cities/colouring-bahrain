export {};

declare global {
  interface Window {
    __APP_API_URL__?: string;
  }

  interface ImportMetaEnv {
    VITE_API_URL?: string;
  }

  interface ImportMeta {
    env?: ImportMetaEnv;
  }
}