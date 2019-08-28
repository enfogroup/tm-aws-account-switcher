export function encodeURLSafe(value: string): string {
  return btoa(value)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export function decodeURLSafe(value: string): string {
  return atob(value.replace(/\-/g, '+').replace(/_/g, '/'))
}
