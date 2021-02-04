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

import { withI18n } from 'react-tinacms-i18n';
import { PromptProvider } from '@tinalabs/react-tinacms-prompts';
import WhatsNext from './pages/WhatNext';

const App = () => {
  const ApiOptions = {
    localeList: [
      { language: { code: 'en', label: 'English' } },
      { language: { code: 'fr', label: 'French' }, region: { code: 'CA', label: 'Canada' } },
      { language: { code: 'sp', label: 'Spanish' }, region: { code: 'US', label: 'United States' } },
    ],
  };

  return (
    <Router basename={process.env.REACT_APP_BASE_PATH || ''}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/setup" component={withI18n(Setup, { ApiOptions })} />
        <Route
          path="/translations"
          component={withI18n(Translations, { ApiOptions })}
        />
        <Route
          path="/switch-locale"
          component={withI18n(SwitchLocale, { ApiOptions })}
        />
        <Route
          path="/using-prompts"
          component={withI18n(UsingPrompts, { ApiOptions })}
        />
        <Route
          path="/whats-next"
          component={withI18n(WhatsNext, { ApiOptions })}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
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
        <App />
      </PromptProvider>
    </TinaProvider>
  );
};
