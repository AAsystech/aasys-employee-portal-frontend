import { createAuthClient } from '@neondatabase/neon-js/auth';
export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL);
export const allowedDomain = import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN;
window.authClient = authClient;
