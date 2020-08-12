# react-tinacms-localization

## Getting started

```bash
yarn add @tinacms/react-tinacms-localization
```

### Create a new instance of the localization api

you can pass the list of languages and the icons but these are optiona

```ts
import { LocalizationApi } from '@tinacms/react-tinacms-localization';
//...
const localization = new LocalizationApi();
```

### Add the localization api to the cms

```ts
const cms = (cms = new TinaCMS({
  enabled: props.pageProps.preview,
  //...
  apis: {
    //...
    localization: localization,
  },
}));
```

or

```ts
cms.api.registerApi('localization', localization);
```

> Note: Unlike Plugins, APIs should be registered when the CMS is instantiated, and never removed.

Where you that cms object must be passed to the tina provider

```tsx
<TinaProvider cms={this.cms}>//...</TinaProvider>
```

### Making a translation

when we want to make a translation we can use the `useTranslation` hooks to localize our app. `useTranslation` returns a `t` function that is used for translating text and an instance of the localization plugin (called i18n)

```tsx
import { useTranslation } from '@tinacms/react-tinacms-localization';
//..
const data = {heading: 'this is a heading'}
const defaultData = {heading: 'heading', body: 'this is the body text'}
const [t, i18n ] = useTranslation(data, defaultData)
//..
// this displays 'this is a heading'
<h1>
{t('heading')}
</h1>

// ...
// this displays 'this is the body text'
<p>
{t('body')}
</p>
```

it also works with nested data

```tsx
import { useTranslation } from '@tinacms/react-tinacms-localization';
//..
const data = {some: {nested: {data: 'hello world'}}}
const [t, i18n ] = useTranslation(data, defaultData)

//..
<h1>
{t('some.nested.data')}
</h1>
```

### Switching the locale

```ts
i18n.locale = { region: 'ca', language: 'en' };
```

or if your not using the `useTranslation` hook

```ts
cms.api.localization.locale = { region: 'ca', language: 'en' };
```

### Fetching data based on the locale

Get the formatted current locale

```ts
const current locale  = i18n.getFormateLocale()
```

or

```ts
const currentLocale = cms.api.localization.getFormateLocale();
```

now one can use the currentLocal when fetching data

```ts
const data = await fetch(`www.example.com/api/some/path/${currentLocale}`);
```

### adding the the toolbar plugin

in a global scope or on the page you wish to add this plugin you can use the

```ts
import { useCMS } from 'tinacms';
import { LocalePickerToolbarPlugin } from '@tinacms/react-tinacms-localization';

//...

const cms = useCMS();
React.useEffect(() => {
  cms.plugins.add(LocalePickerToolbarPlugin);
}, []);
```

### using the locale prompt

register the plugin

```tsx
import { useLocalePromptPlugin, PromptRenderer } from "react-tinacms-localization"
//...
useLocalePromptPlugin(data, options)
//...
//... somewhere in the component tree render
<PromptRenderer />
```

this registers a `prompts plugin` that will render a prompt in edit mode letting the user know that no localization for this page exists

## Generate Docs

```bash
yarn docs
```

or

```bash
npm run docs
```

This well generate the docs and you can open `docs/docs/index.html` in your browser to view

# [API DOCS](https://tinacms.github.io/react-tinacms-localization/docs/)
