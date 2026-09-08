export function normalizeEmail(value) { return value.trim().toLowerCase(); }
export function isValidEmail(value) {
  const email = normalizeEmail(value);
  if (email.length > 254) return false;
  const parts = email.split('@');
  return parts.length === 2 && parts[0].length <= 64 && !parts[0].startsWith('.') && !parts[0].endsWith('.') && !parts[0].includes('..') && /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email);
}
