/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the API. Defaults to http://localhost:3001 when unset. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
