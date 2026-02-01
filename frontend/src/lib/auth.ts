const TOKEN_KEY = '@pet-shop:token';

export function getCurrentUserId(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1] ?? ''));
    return payload.sub ?? null;
  } catch {
    return null;
  }
}
