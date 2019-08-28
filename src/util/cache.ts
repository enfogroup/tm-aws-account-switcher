import { addHours } from 'date-fns'

export function get<T>(key: string): T {
  const data = sessionStorage.getItem(key)
  if (!data) {
    return null
  }

  const now = new Date()
  const decoded = JSON.parse(data)
  decoded.exp = new Date(decoded.exp)

  // If the item is expired, remove it and return null
  if (decoded.exp < now) {
    sessionStorage.removeItem(key)
    return null
  }

  return decoded.data
}

export function has(key: string): boolean {
  return !!get<any>(key)
}

export function set(key: string, data: any, exp?: Date) {
  // If no expiration is supplied, default to one hour from now.
  const expiration = exp ? exp : addHours(new Date(), 1)

  const encoded = JSON.stringify({
    data: data,
    exp: expiration,
  })

  sessionStorage.setItem(key, encoded)
}

export async function remember<T>(
  key: string,
  fn: () => T,
  exp?: Date,
): Promise<T> {
  let item = get<T>(key)

  if (!item) {
    item = await fn()
    set(key, item, exp)
  }

  return item
}

export function remove(key: string) {
  sessionStorage.removeItem(key)
}
