/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly BACKEND_URL: string;
  readonly NODE_ENV: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
