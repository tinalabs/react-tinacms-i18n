import React, { useState } from 'react';
import { useCMS } from 'tinacms';

// import Home from './pages/Home.js';
// import Setup from './pages/Setup.js';
// import Translations from './pages/Translations.js';
// import SwitchLocale from './pages/SwitchLocale';
// import UsingPrompts from './pages/UsingPrompts';

import NavItem from '../components/Nav.js';
import { Container, Columns, Column } from 'bloomer';
import { Button } from 'bloomer/lib/elements/Button';
import { Link } from 'react-router-dom';
import Code from './Code.js';
export const Layout = ({ children, nextLink, prevLink, code }) => {
  const cms = useCMS();
  const [showCode, setVisibility] = useState(false);
  return (
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
              TinaCMS i18n Example
            </Link>
          </h1>
          {children}
          <div style={{ marginRight: '0px', marginTop: '40px' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {prevLink && (
                <Link to={prevLink}>
                  <Button type="button" className="button is-small">
                    Previous
                  </Button>
                </Link>
              )}

              <Button
                onClick={cms.toggle}
                type="button"
                className="button is-small"
              >
                Toggle Edit Mode
              </Button>
              {code && (
                <Button
                  type="button"
                  className="button is-small"
                  onClick={() => {
                    setVisibility(!showCode);
                  }}
                >
                  {showCode ? 'Close Code' : 'Show Code'}
                </Button>
              )}

              {nextLink && (
                <Link to={nextLink}>
                  <Button type="button" className="button is-small">
                    Next
                  </Button>
                </Link>
              )}
            </div>
            <Code show={showCode}>{code}</Code>
          </div>
        </Column>

        <Column isSize="1/4">
          Table of Contents
          <ol style={{ marginTop: 20 }}>
            <NavItem to="/">
              <li>Welcome</li>
            </NavItem>
            <NavItem to="/setup">
              <li>Register the API</li>
            </NavItem>
            <NavItem to="/translations">
              <li>Make Translations</li>
            </NavItem>
            <NavItem to="/switch-locale">
              <li>Switching Locales</li>
            </NavItem>
            <NavItem to="/using-prompts">
              <li>Using Prompts</li>
            </NavItem>
            <NavItem to="/whats-next">
              <li>Whats Next?</li>
            </NavItem>
          </ol>
        </Column>
      </Columns>
    </Container>
  );
};
