# PnPjs Debug

Allows debugging local sources of PnPjs right in TypeScript with live requests to SharePoint environment in Node.js.

## Prerequisites

- Node.js
- TypeScript
- TSLint
- Gulp

### Install Node.js global modules

```bash
npm install typescript tslint ts-node gulp -g
```

## Fork projects

- [PnPjs](https://github.com/pnp/pnpjs)
- [PnPjs Debug](https://github.com/koltyakov/PnPjs-Debug)

## Clone forks

Projects' folders should be located in the same root folder.

```bash
git clone https://github.com/[namespace]/PnPjs
git clone https://github.com/[namespace]/PnPjs-Debug
```

`[namespace]` stands for you or your company GitHub account.

## Install dependencies

Dependencies should be restored in both projects' folders:

```bash
npm install
```

or

```bash
yarn install
```

## VS Code is our editor of choise

Open both projects in VS Code. Workspaces are the best option here.

## Upstream for PnPjs

Add upstream for PnPjs (one-time operation).
In `PnPjs`'s folder:

```bash
git remote add upstream https://github.com/pnp/PnPjs
```

This will allow syncing your repository sources with main repo with:

```bash
git pull upstream dev
```

## Feature branch

It's recommended using feature branches for code changes related to a specific feature or bug fix.

Before creating a feature branch make sure:

- A feature branch is based on PnPjs `dev` branch.
- The local branch is synced with remote `upstream` branch (this can be done with feature branch too).

```bash
git checkout dev
git fetch upstream dev
git checkout -b [name_of_your_new_branch]
```

It's better to prefix feature branch with `dev-`.

## Connecting tools with SharePoint

On first run SharePoint environment connection should be initiated:

### Run npm task

```bash
npm run init
```

You'll be prompted with SharePoint web URL and credentials, just follow the wizard.

Read [more](https://github.com/s-KaiNet/node-sp-auth) about supported auth scenarios.

Also a native `@pnp/nodejs` client can be used.

### Configuration files

Connection is saved to config files which are better to exclude from a git repository.
By default config path is `./config/private.json`. Passwords in configs are stored in an encrypted way.

Config sample:

```json
{
  "siteUrl": "https://contoso.sharepoint.com/sites/dev-a",
  "strategy": "UserCredentials",
  "username": "andrew.koltyakov@contoso.onmicrosoft.com",
  "password": "bcccd4e6025...ZH+ZY5X2A=="
}
```

## Making changes

Now you can apply changes to PnPjs project sources (your local copy).
Follow [Getting Started: Contribute](https://github.com/SharePoint/PnP-JS-Core/wiki/Getting-Started:-Contribute) wiki page's instructions.

After changes in PnPjs's packages run:

```bash
gulp package
```

So the changes are ready for local debug without any additional installation of peer dependencies.

## Debugging with PnPjs Debug

In `PnPjs-Debug/runners` project's folder create a `.ts` file.

Wrap file with:

```TypeScript
import { Web } from './../../PnPjs/dist/packages/sp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  let web = new Web(settings.siteUrl);
  // executing methods to test

}).catch(console.log);
```

Place debug break points in PnPjs `.ts` sources or your custom code.
Open a runner which executes logic to test and start a debugger for the current file.

Now all the power of VS Code debugger is our oyster!