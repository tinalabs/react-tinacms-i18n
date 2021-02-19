import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

import { Button } from 'bloomer';

SyntaxHighlighter.registerLanguage('diff', diff);

export default function Diff(props) {
  const [show, setVisibility] = useState(false);
  return (
    <div style={{ marginRight: 60, marginTop: 40 }}>
      <div style={{ width: '100%', textAlign: 'right' }}>
        <Button isSize="small" onClick={() => setVisibility(!show)}>
          {show ? 'Hide Code' : 'Show Code'}
        </Button>
      </div>
      {show && (
        <div style={{ width: '100%', fontSize: 14 }}>
          <SyntaxHighlighter language="diff" style={prism}>
            {props.children}
          </SyntaxHighlighter>
        </div>
      )}
      {show && props.readMoreLink && (
        <a href={props.readMoreLink} target="_blank" rel="noopener noreferrer">
          {props.readMoreText}
        </a>
      )}
    </div>
  );
}
