import { CSRF, USERNAME } from '../constants'
import { Switcher } from '../gui/switcher'
import { Account } from '../types'
import * as cache from '../util/cache'
import * as base64 from '../util/base64'
import * as http from '../util/request'

export default async function main() {
  try {
    let accounts: Account[] = tampermonkey.manualAccounts

    if (!!tampermonkey.apiKey) {
      const tmp = await cache.remember('accounts', async () => {
        const resp = await http.get<Account[]>(
          `${tampermonkey.apiURL}?id=${base64.encodeURLSafe(USERNAME)}`, // highly skeptical of using this as the id, rethink in future.
          { 'x-api-key': tampermonkey.apiKey },
        )

        if (resp.status !== 200) {
          throw new Error(`failed to load accounts: ${resp.statusText}`)
        }

        return resp.response
      })

      accounts = accounts.concat(tmp)
    }

    new Switcher(accounts, CSRF)
  } catch (e) {
    console.log(
      'Internal Error: Please report this bug to Enfo with the following trace:',
    )
    console.log(e)
  }
}
