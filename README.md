# react-tinacms-i18n

## Getting started

```bash
yarn add @tinalabs/react-tinacms-i18n
```

## First wrap you app in the with the i18n function

We pass out app component along with the configuration for the plugin to the with tina plugin. If you dont want to use this helper function and want to setup stuff mananualy [read here](#withi18n-alternative)

```tsx
import { withI18n } from '@tinalabs/react-tinacms-i18n';

const AppWrapper = withI18n(App, {
  ApiOptions: {
    localeList: [
      { language: 'en', region: 'ca' },
      { language: 'fr', region: 'ca' },
      { language: 'en', region: 'us' },
      { language: 'sp', region: 'us' },
    ],
  },
});
```

Note: this most also be inside the tina provider to your app return statement may look something like this

```ts
export default () => {
  const cms = new TinaCMS({
    sidebar: {
      position: 'displace',
    },
    enabled: true,
    toolbar: true,
  });
  return (
    <TinaProvider cms={cms}>
      <AppWrapper />
    </TinaProvider>
  );
};
```

### Making a translation

When we want to make a translation we can use the `useTranslation` hooks to localize our app. `useTranslation` returns a `t` function that is used for translating text and an instance of the localization plugin (called i18n)

```tsx
import { useTranslation } from '@tinalabs/react-tinacms-i18n';
//..
const data = {heading: 'this is a heading'}
const fallbackData = {heading: 'heading', body: 'this is the body text'}
const t = useTranslation(data, fallbackData)
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

It also works with nested data

```tsx
import { useTranslation } from '@tinalabs/react-tinacms-i18n';
//..
const data = {some: {nested: {data: 'hello world'}}}
const t = useTranslation(data, fallbackData)

//..
<h1>
{t('some.nested.data')}
</h1>
```

### Switching the locale

```ts
import { useI18n } from '@tinalabs/react-tinacms-i18n';

const i18n = useI18n()
i18n.setLocale({ region: 'ca', language: 'en' });
```

### Fetching data based on the locale

Get the formatted current locale

```ts
const currentLocale = i18n.getFormateLocale();
```

Now one can use the currentLocal when fetching data

```ts
const data = await fetch(`www.example.com/api/some/path/${currentLocale}`);
```

### Using the locale prompt

Register the plugin
Note: this requires a peer dependency @tinalabs/react-tinacms-prompts

so first first

```bash
npm i @tinalabs/react-tinacms-prompts --save
```

First wrap your app or a component with the prompt provider. The only stipulation is that it must be a child of the tina provider

```tsx
import { PromptProvider } from '@tinalabs/react-tinacms-prompts';
<PromptProvider>
  <App />
</PromptProvider>;
```

Next we registers a `prompts plugin` that will render a prompt in edit mode letting the user know that no localization for this page exists. This will render when the given condition is true.

```ts
import { useLocalePromptPlugin } from '@tinalabs/react-tinacms-i18n';

useLocalePromptPlugin(condition, options);
```

## WithI18n alternative

This can be a bit confusing to do but may be necessary in some use cases.

The General idea is this

```tsx
<TinaProvider cms={cms}>
  // register the localization plugin in here
  <I18nProvider>
    // register the toolbar plugin in here
    <App />
  </I18nProvider>
</TinaProvider>
```

you can see how the `withI18n` function does this

```tsx
export const withI18n = (Component: any, options: SetupProps) => {
  return (props: any) => {
    const cms = useCMS();
    const i18n = new ReactLocalizationAPI(
      options.ApiOptions.localeList,
      options.ApiOptions.imgMap
    );
    cms.registerApi('localization', i18n);
    const Wrapper = () => {
      useEffect(() => {
        cms.plugins.add(LocalePickerToolbarPlugin);
      }, []);
      return <Component {...props} />;
    };
    return (
      <I18nProvider i18n={i18n}>
        <Wrapper />
      </I18nProvider>
    );
  };
};
```

## Generate Docs

```bash
yarn docs
```

or

```bash
npm run docs
```

This well generate the docs and you can open `docs/docs/index.html` in your browser to view

# [API DOCS](https://tinacms.github.io/react-tinacms-i18n/docs/)
