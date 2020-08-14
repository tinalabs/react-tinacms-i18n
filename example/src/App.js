import React from 'react';

import 'bulma/css/bulma.min.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { useCMS, withTina } from 'tinacms';

import Home from './pages/Home.js';
import Setup from './pages/Setup.js';
import Translations from './pages/Translations.js';
import SwitchLocale from './pages/SwitchLocale';
import Blocks from './pages/Blocks.js';
import Inline from './pages/Inline.js';
import GlobalForms from './pages/GlobalForms.js';
import Data from './pages/Data.js';

import NavItem from './components/Nav.js';
import { Container, Columns, Column } from 'bloomer';
import { useSetupI18 } from '@tinalabs/react-tinacms-localization';

const App = () => {
  const cms = useCMS();
  useSetupI18({
    ApiOptions: {
      localeList: [
        { language: 'en', region: 'ca' },
        { language: 'fr', region: 'ca' },
        { language: 'en', region: 'us' },
        { language: 'sp', region: 'us' },
      ],
    },
  });
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
              {/* <NavItem to="/forms">
                <li>Forms</li>
              </NavItem>
              <NavItem to="/form-fields">
                <li>Form Fields</li>
              </NavItem>
              <NavItem to="/blocks">
                <li>Blocks</li>
              </NavItem>
              <NavItem to="/inline">
                <li>Inline Editing</li>
              </NavItem>
              <NavItem to="/global-forms">
                <li>Global Forms</li>
              </NavItem>
              <NavItem to="/data">
                <li>Working with Data</li>
              </NavItem> */}
            </ol>
          </Column>
        </Columns>
      </Container>
    </Router>
  );
};

export default withTina(App, {
  sidebar: {
    position: 'displace',
  },
  enabled: true,
  toolbar: true,
});
