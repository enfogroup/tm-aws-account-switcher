import css from '../style/main'
import { Account } from '../types'

export class Switcher {
  public visible: boolean

  protected accounts: Account[]
  protected button: HTMLAnchorElement
  protected csrf: string
  // the index is used to make sure we don't have the query all the elements every time we want to filter.
  protected index: { [key: string]: HTMLDivElement }
  protected list: HTMLDivElement
  protected search: HTMLInputElement

  public constructor(accounts: Account[], csrf: string) {
    this.accounts = accounts
    this.csrf = csrf
    this.index = {}
    this.visible = false

    // inject our loaded css
    const style = document.createElement('style')
    style.innerText = css
    document.head.appendChild(style)

    this.button = this.createFloatingButton()
    this.search = this.createSearchField()
    this.list = this.createList(this.search)

    document.body.appendChild(this.button)
    document.body.appendChild(this.list)
    document.body.addEventListener('click', event => {
      if (
        (<HTMLElement>event.target).closest(
          `#${this.list.id}, #${this.button.id}`,
        )
      ) {
        return event
      }
      this.hide()
    })
  }

  public show() {
    this.resetSearch()
    this.list.scrollTo(0, 0)
    this.list.classList.add('open')
    this.button.classList.add('open')

    this.visible = true
  }

  public hide() {
    this.list.classList.remove('open')
    this.button.classList.remove('open')

    this.visible = false
  }

  public toggle() {
    if (this.visible) {
      return this.hide()
    }
    return this.show()
  }

  private resetSearch() {
    this.search.value = ''
    this.filter('')
    this.search.focus()
  }

  private filter(val: string) {
    // split the filter value into parts so we can match regardless of order
    const parts = val.toLowerCase().split(' ')
    for (const account of this.accounts) {
      const element = this.index[`${account.Id}_${account.Role}`]
      if (!element) {
        continue
      }

      const full = `${account.Id} ${account.Name} ${this.accountRoleToLabel(
        account.Role,
      )}`.toLowerCase()
      const display = parts.every(part => full.includes(part))

      element.style.display = display ? 'flex' : 'none'
    }
  }

  private createFloatingButton(): HTMLAnchorElement {
    const btn = document.createElement('a')
    btn.id = 'aws-switch-account-button'
    btn.innerHTML = '<span>&#10005;</span>'
    btn.addEventListener('click', () => {
      this.toggle()
    })
    return btn
  }

  private createSearchField(): HTMLInputElement {
    const input = document.createElement('input')
    input.id = 'aws-switch-account-search-field'
    input.type = 'text'
    input.placeholder = 'Search...'
    input.addEventListener('keyup', event => {
      const value = (<HTMLInputElement>event.target).value.toLowerCase()
      this.filter(value)
    })
    return input
  }

  private createList(input: HTMLInputElement): HTMLDivElement {
    const redirectURI = encodeURIComponent(window.location.href)
    const list = document.createElement('div')
    list.id = 'aws-switch-account-list'
    list.appendChild(input)

    const back = this.createBackButton(redirectURI)
    if (back) {
      list.appendChild(back)
    }

    for (const account of this.accounts) {
      list.appendChild(this.createAccountButton(account, redirectURI))
    }

    return list
  }

  private createAccountButton(
    account: Account,
    url: string,
  ): HTMLDivElement | null {
    const btn = document.createElement('div')
    btn.innerHTML = `
      <form action="https://signin.aws.amazon.com/switchrole" method="POST" target="_top">
        <input type="hidden" name="action" value="switchFromBasis">
        <input type="hidden" name="src" value="nav">
        <input type="hidden" name="roleName" value="${account.Role}">
        <input type="hidden" name="account" value="${account.Id}">
        <input type="hidden" name="mfaNeeded" value="0">
        <input type="hidden" name="color" value="146eb4">
        <input type="hidden" name="csrf" value="${this.csrf}">
        <input type="hidden" name="redirect_uri" value="${url}">
        <input type="hidden" name="displayName" value="${account.Name}">
        <div class="list-div"> 
        <button type="button" class="list-copy-button" onclick="navigator.clipboard.writeText(${account.Id})"> &#x1f4cb; </button>
          <button type="submit" class="list-button">
            <span class="role">${this.accountRoleToLabel(account.Role)}</span>
            ${account.Name}
          </button>
        </div>
      </form>`
    this.index[`${account.Id}_${account.Role}`] = btn

    return btn
  }

  private createBackButton(url: string): HTMLDivElement | null {
    const csrfField: HTMLInputElement = document.querySelector(
      '#awsc-exit-role-form input[name=csrf]',
    )
    if (!csrfField) {
      return null
    }

    const btn = document.createElement('div')
    btn.style.backgroundColor = '#999999'
    btn.innerHTML = `
      <form action="https://signin.aws.amazon.com/switchrole" method="POST" target="_top">
        <input type="hidden" name="action" value="switchToBasis">
        <input type="hidden" name="src" value="nav">
        <input type="hidden" name="csrf" value="${csrfField.value}">
        <input type="hidden" name="redirect_uri" value="${url}">
        <button type="submit" class="list-button">
          <span class="back-icon"><span style="margin-left: -1px;">&#x23CE;</span></span>
          <span>Back to Enfo Auth</span>
        </button>
      </form>`

    return btn
  }

  // should probably be moved elsewhere
  private accountRoleToLabel(role: string): string {
    const parts = role.split('-')
    if (parts.length !== 3) {
      return 'Default'
    }
    return parts[1]
  }
}
