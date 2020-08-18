import React, { useEffect } from 'react';

import 'bulma/css/bulma.min.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { TinaCMS, TinaProvider, useCMS } from 'tinacms';

import Home from './pages/Home.js';
import Setup from './pages/Setup.js';
import Translations from './pages/Translations.js';
import SwitchLocale from './pages/SwitchLocale';
import UsingPrompts from './pages/UsingPrompts';

import NavItem from './components/Nav.js';
import { Container, Columns, Column } from 'bloomer';
import { PromptProvider, withI18n } from '@tinalabs/react-tinacms-localization';
import { Button } from 'bloomer/lib/elements/Button';

const App = () => {
  const cms = useCMS();

  const ApiOptions = {
    localeList: [
      { language: 'en', region: 'ca' },
      { language: 'fr', region: 'ca' },
      { language: 'en', region: 'us' },
      { language: 'sp', region: 'us' },
    ],
  };

  return (
    <Router basename={process.env.REACT_APP_BASE_URL || ''}>
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
                TinaCMS i18n Example test
              </Link>
            </h1>
            <Button onClick={cms.toggle}>Toggle edit mode</Button>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/setup"
                component={withI18n(Setup, { ApiOptions })}
              />
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
