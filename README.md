#Hubspot Development Boilerplate


##Credits
***

This boilerplate is based on the [Hubspot Local Development Boilerplate](https://designers.hubspot.com/docs/tools/local-development). The added packages are selected by Linsey Brander & Teun Rutten.


##About
***

This is a starter pack for developing WordPress projects. The project structure is:

- `/src` folder for all your source files,
- `/dist` folder that is synced with Hubspot.

###Features

- Gulp
- SCSS
- Bundles SVG icons to a single file
- Prettier & ESLint
- Webpack (ES6)


##Getting started
***

### 1. Install Hubspot dependencies

- Install [Node.js](https://nodejs.org/en/), a Javascript runtime environment that enables the local tools. Versions 8.9.1 or higher of Node are supported, but we recommend the long-term support (LTS) version.
- Install the gulp-cli globally: `yarn global add gulp-cli`

### 2. Install all project dependencies

Run `yarn install` in the project root

### 3. Setup Hubspot configuration

1. Empty the existing hubspot.config.yml or create a new one with the following command: `touch hubspot.config.yml`
2. Create a private developer app. NOTE: If you select more than the "Content" scope in your apps permissions, your app will not work with this tooling. The app will work with no scopes selected.
3. Run `yarn hubspot:auth` in the command line. This will begin a series of command line prompts.
4. Enter your CMS Portal id.
5. Enter your client id and client secret from your private developer app. This will open a window in your default browser requesting authorization.
6. Select your CMS portal on the authorization page.
7. Request for Integrations Permissions: your private app will request permission to access your account data. Click "Grant Access".
8. If successful, you should see "Authorization Succeeded", and your hubspot.config.yml file will be updated.
9. Add a `name` to the first portal and select a `defaultPortal`:
```
defaultPortal: 'DEV'
portals:
  - name: 'DEV'
    portalId: 6223912
    authType: oauth2 
...

```

## How it works
***

This boilerplate handles the building and deploying of JavaScript, CSS and Hubspot modules. It uses Gulp and Webpack to create minified main.js and main.css files and 'builds' all files in the `/dist` folder. The dist folder is the only folder that is synced with Hubspot, so all files in the project root and in `/src` are for local development. There are a few default commands that can be used in the `package.json`. The main command you need to build and sync files with Hubspot is `yarn deploy`.

### A few comments

- Syncing doesn't delete files in Hubspot
- Create modules local only. *NEVER* create or edit custom modules in the 'Design Tools' of Hubspot
- Templates are not created locally, you have to create 'Drag and drop' templates in the 'Design Tools' of Hubspot
- You have to connect the `main.css` and `main.js` files to every template you create

