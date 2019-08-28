interface Response<T> {
  response: T
  status: number
  statusText: string
}

export function get<T>(
  url: string,
  headers: { [key: string]: any } = {},
): Promise<Response<T>> {
  const requester =
    // @ts-ignore
    GM && GM.xmlHttpRequest ? GM.xmlHttpRequest : GM_xmlhttpRequest
  return new Promise((resolve, reject): void => {
    requester({
      method: 'GET',
      url,
      responseType: 'json',
      headers,
      onload: resolve,
      onabort: reject,
      onerror: reject,
      ontimeout: reject,
    })
  })
}
