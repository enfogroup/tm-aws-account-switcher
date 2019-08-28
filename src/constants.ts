export const CSRF = ((): string => {
  // needs to be ignored since it comes from a script "global"
  // @ts-ignore
  return unsafeWindow.AWSC.Auth.getMbtc()
})()
export const USERNAME = ((): string => {
  const v = document.getElementById('awsc-login-display-name-user')
  return v && v.innerText
})()
