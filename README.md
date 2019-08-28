# Tampermonkey AWS Account Switcher

A Tampermonkey script to help users to easily switch to their permitted AWS accounts within the management console.

### Installation

First you need to install Tampermonkey or Greasemonkey in your prefered browser. The script is tested to work with Tampermonkey v4.9 and Greasemonkey v4.9.

If you encounter an issue with any other version please open an issue here regarding that.

After you have installed your prefered userscript plugin, either download the pre-compiled script from the [releases](/releases/latest) page or by cloning this repository and running

```
npm install && npm run-script build
```

and grabbing the generated `index.user.js` file from the `dist` folder.

When you have the script at your hand, create a new userscript within your plugin and insert the code from the `index.user.js` file into it. You will notice there is an object called `tampermonkey` at the top-level that contains some configuration values, the use of them is as follows:

- `apiKey`: Token used to authenticate against the Accounts API.
- `apiURL`: The URL that is used to reach the Accounts API.
- `manualAccounts`: If you want to add any additional accounts besides those fetched from the API, this can be done as an array here.

If you currently don't have an `apiKey` or want to know the `apiURL` contact someone from Enfo COPS AWS either through Slack or cops-aws@enfogroup.com.

### Functionality

The plugin will display a floating button in the bottom-left of your browser viewport whenever you are located within the AWS Management Console.

Opening it will reveal a list of all the accounts you have permission to access through cross-account jumping, which the option to search by:

- Account Name
- Account ID
- Role

or a combination of them.

Clicking any of the items will make you switch into that role in the given account, while still retaining your current location and region context.
