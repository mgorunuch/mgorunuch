/// <reference types="react-scripts" />


declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
    readonly GOOGLE_ANALYTICS_TRACK_ID: string;
  }
}
