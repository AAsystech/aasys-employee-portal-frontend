import { authClient } from './auth';

const API_URL = import.meta.env.VITE_API_URL;

export async function api(path, options = {}) {
  const sessionResult = await authClient.getSession();

  console.log("SESSION RESULT:", sessionResult.data);

  const token =
    sessionResult.data?.session?.token ||
    sessionResult.data?.session?.accessToken ||
    sessionResult.data?.session?.access_token;

  console.log("TOKEN PAYLOAD:", JSON.parse(atob(token.split(".")[1])));

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || 'Request failed');
  }

  if (res.status === 204) return null;
  return res.json();
}