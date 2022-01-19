/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
    VITE_REDIS_HOST: string;
    VITE_REDIS_PASS: string;
    VITE_REDIS_PORT: number;
}