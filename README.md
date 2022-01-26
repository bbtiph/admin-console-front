<p align="center" style="background-color:white;">
  <a href="https://post.kz">
    <img src="https://post.kz/react/static/media/logo_blue.292d6f7d.svg" alt="Kazpost" width="200" height="96">
  </a>
</p>

<h1 align="center">Kazpost Admin Console</h1>

<h3 align="center">Kazpost - Let's make Kazakhstan great again</h3>
<p align="center">Presentation layer aka front-end</p>

This project uses the create-react-app starter pack. The create-react-app helps
you kick off projects without configuring, so you don't have to setup your
project by yourself.

<p align="center">
  <a href="https://gitlab.com/kazpost/mail/-/tree/develop/frontend/docs"><strong>Explore docs</strong></a>
  <br>
  <a href="https://gitlab.com/kazpost/mail/-/issues">Report bug</a>
  ·
  <a href="https://gitlab.com/kazpost/mail/-/issues">Request feature</a>
</p>

## Status

![website](https://img.shields.io/website?url=https%3A%2F%2Fpost.kz)
![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fpost.kz)
![Twitter Follow](https://img.shields.io/twitter/follow/kazpost?style=social)
![YouTube Video Views](https://img.shields.io/youtube/views/Om5NSnFziEE?style=social)

## NPM scripts

```ps1
# @see: https://github.com/facebook/create-react-app#whats-included

# Start the project in the development mode
npm run start

# Build the project in the production mode
npm run build

$s = Get-Content .env -First 1;
$s.Substring(0, $s.IndexOf('='));
(Get-Content -path .env -Raw) -replace 'development','production';
```

## Git

```ps1
git clone --depth 1 https://gitlab.com/kazpost/mail.git
```

## Migrations

#### Migrating "Create-React-App" from 2.1.x to 3.0.0

```ps1
# @see: https://github.com/facebook/create-react-app/blob/master/CHANGELOG-3.x.md
npm install --save --save-exact react-scripts@3.0.0
```

#### Migrating "React" from 16.8.6 to 17.0.0

```ps1
# @see: https://github.com/facebook/react/releases
# @see: https://github.com/facebook/react/releases/tag/v17.0.0

# Artifacts:
# react: https://unpkg.com/react@17.0.1/umd/
# react-art: https://unpkg.com/react-art@17.0.1/umd/
# react-dom: https://unpkg.com/react-dom@17.0.1/umd/
# react-is: https://unpkg.com/react-is@17.0.1/umd/
# react-test-renderer: https://unpkg.com/react-test-renderer@17.0.1/umd/
# scheduler: https://unpkg.com/scheduler@0.20.1/umd/
```

## Design Prototypes

```ps1
# File: kazpost_design-protos.ps1

$url = 'https://www.figma.com/file/K9pnrxh1ptHAtbwkuXAX2HCY/Post_redesign';
$urls = @(
  'https://www.figma.com/file/K9pnrxh1ptHAtbwkuXAX2HCY/Post_redesign',
  'https://www.figma.com/file/RTauTmsTlwhBhYLFsvGUbGdt/Paypost?node-id=0%3A1',
  'https://www.figma.com/file/CmPQoBz0ElR1zfcDn16fie/%D0%9F%D0%BE%D1%87%D1%82%D0%B0?node-id=0%3A1'
)

try {
  $chrome = (Get-ItemProperty 'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe').'(Default)';
  Start-Process "$chrome" $url;
}
catch {
  Start-Process $url;
}
```

## Prettier

We use prettier code formatter. It helps us in removing all original styling
and ensures that all outputted code conforms to a consistent style.

```ps1
npm install --save-dev --save-exact prettier
```

Create an empty config file to let editors and other tooling know you are
using Prettier

## JsConfig

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

## Helpers

```
npm rebuild css-loader
npm rebuild postcss-loader
npm rebuild resolve-url-loader
npm rebuild sass-loader
```

## API Documentation

```
http://test.post.kz:8080/mail-app/swagger-ui.html
```

## Financial and postal services

```
https://bot.post.kz/application/postkz_date/01.01.2021/07.04.2021/0/
```

## Notes

- We tend to use functional programming for cleaner code and for understanding key concepts;

## Our Team Tips

- Choose only one project at a time;
- Replicate, but don't copy-paste the codes;
- Be curious, find out why the codes work;
- Experiment, and add your own flavour;
- Have patience and stay focused;

- We MUST be more competitive than Kaspi.kz;
- The law is on our side and it's the crucial part in the IT race;

## Infrastructure

```
http://192.168.99.29:8081/#admin/repository/repositories:post
```

## References  

1. https://styled-components.com
2. https://getuikit.com
3. https://regex101.com
4. https://jsdoc.app/tags-returns.html
5. https://eslint.org/docs/rules/valid-jsdoc
6. https://docs.npmjs.com/configuring-npm/npmrc.html
7. https://www.i18next.com/translation-function/interpolation
8. https://github.com/timarney/react-app-rewired
9. https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md
10. https://react-redux.js.org/api/connect
11. https://gitlab.com/kazpost/mail
12. https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
13. https://prettier.io/docs/en/install.html
14. https://reqbin.com/