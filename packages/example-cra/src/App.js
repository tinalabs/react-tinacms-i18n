import React from 'react';

import 'bulma/css/bulma.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { TinaCMS, TinaProvider } from 'tinacms';

import Home from './pages/Home.js';
import Setup from './pages/Setup.js';
import Translations from './pages/Translations.js';
import SwitchLocale from './pages/SwitchLocale';
import UsingPrompts from './pages/UsingPrompts';

import { I18nClient, I18nProvider } from 'react-tinacms-i18n';
import { PromptProvider } from '@tinalabs/react-tinacms-prompts';
import WhatsNext from './pages/WhatNext';

const App = () => {
  return (
    <Router basename={process.env.REACT_APP_BASE_PATH || ''}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/setup" component={Setup} />
        <Route
          path="/translations"
          component={Translations}
        />
        <Route
          path="/switch-locale"
          component={SwitchLocale}
        />
        <Route
          path="/using-prompts"
          component={UsingPrompts}
        />
        <Route
          path="/whats-next"
          component={WhatsNext}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default () => {
  const i18n = new I18nClient({
    locale: { language: { code: 'sp', label: 'Spanish' }, region: { code: 'US', label: 'United States' } },
    locales: [
      { language: "ru" },
      { language: { code: 'en', label: 'English' } },
      { language: { code: 'fr', label: 'French' } },
      { language: { code: 'fr', label: 'French' }, region: "FR" },
      { language: { code: 'en', label: 'English' }, region: { code: "CA", label: "Canada" } },
      { language: { code: 'fr', label: 'French' }, region: { code: "CA", label: "Canada" } },
      { language: { code: 'sp', label: 'Spanish' }, region: { code: 'US', label: 'United States' } },
    ],
  })
  const cms = new TinaCMS({
    sidebar: {
      position: 'displace',
    },
    enabled: true,
    toolbar: true,
    apis: {
      i18n
    }
  });
  
  return (
    <I18nProvider i18n={i18n}>
      <TinaProvider cms={cms}>
        <PromptProvider>
          <App />
        </PromptProvider>
      </TinaProvider>
    </I18nProvider>
  );
};
