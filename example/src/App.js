import React, { useEffect } from 'react';

import 'bulma/css/bulma.min.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { TinaCMS, TinaProvider, useCMS, withTina } from 'tinacms';

import Home from './pages/Home.js';
import Setup from './pages/Setup.js';
import Translations from './pages/Translations.js';
import SwitchLocale from './pages/SwitchLocale';
import UsingPrompts from './pages/UsingPrompts';
import Blocks from './pages/Blocks.js';
import Inline from './pages/Inline.js';
import GlobalForms from './pages/GlobalForms.js';
import Data from './pages/Data.js';

import NavItem from './components/Nav.js';
import { Container, Columns, Column } from 'bloomer';
import {
  I18nProvider,
  useI18n,
  LocalizationApi,
  LocalePickerToolbarPlugin,
  ReactLocalizationAPI,
  PromptProvider,
  // getLocalePickerToolbarPlugin,
} from '@tinalabs/react-tinacms-localization';

const App = () => {
  const cms = useCMS();
  cms.events.subscribe('plugin:add:prompt', (event) => {
    console.log('an event happends');
    console.log(event);
  });
  const i18n = useI18n();
  console.log({ i18n });
  console.log({ currentLocale: i18n.getLocale() });
  useEffect(() => {
    cms.plugins.add(LocalePickerToolbarPlugin);
  }, []);
  // useEffect(() => {
  //   cms.plugins.add(getLocalePickerToolbarPlugin(i18n));
  // }, []);

  return (
    <Router>
      <Container
        style={{
          marginTop: 40,
          marginBottom: 40,
          paddingLeft: 40,
          paddingRight: 40,
          maxWidth: 1000,
        }}
      >
        <Columns>
          <Column isSize="3/4">
            <h1 className="title is-1">
              <Link to="/" className="has-text-black">
                TinaCMS Concepts
              </Link>
            </h1>
            <button onClick={cms.toggle}>Toggle edit mode</button>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/setup" component={Setup} />
              <Route path="/translations" component={Translations} />
              <Route path="/switch-locale" component={SwitchLocale} />
              <Route path="/using-prompts" component={UsingPrompts} />
              <Route path="/blocks" component={Blocks} />
              <Route path="/inline" component={Inline} />
              <Route path="/global-forms" component={GlobalForms} />
              <Route path="/data" component={Data} />
            </Switch>
          </Column>

          <Column isSize="1/4">
            <ol style={{ marginTop: 20 }}>
              <NavItem to="/">
                <li>Welcome</li>
              </NavItem>
              <NavItem to="/setup">
                <li>Register the Api</li>
              </NavItem>
              <NavItem to="/translations">
                <li>MakeTranslations</li>
              </NavItem>
              <NavItem to="/switch-locale">
                <li>Switch locale</li>
              </NavItem>
              <NavItem to="/using-prompts">
                <li>Using Prompts</li>
              </NavItem>
            </ol>
          </Column>
        </Columns>
      </Container>
    </Router>
  );
};

const AppWrapper = () => {
  const options = {
    ApiOptions: {
      localeList: [
        { language: 'en', region: 'ca' },
        { language: 'fr', region: 'ca' },
        { language: 'en', region: 'us' },
        { language: 'sp', region: 'us' },
      ],
    },
  };
  const cms = useCMS();
  cms.registerApi(
    'localization',
    new ReactLocalizationAPI(
      options.ApiOptions.localeList,
      options.ApiOptions.imgMap
    )
  );
  return (
    <I18nProvider>
      <App />
    </I18nProvider>
  );
};

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
      <PromptProvider>
        <AppWrapper />
      </PromptProvider>
    </TinaProvider>
  );
};
