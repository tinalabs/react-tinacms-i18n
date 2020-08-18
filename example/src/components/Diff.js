import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff';

import { Button } from 'bloomer';

SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function Diff(props) {
  const [show, setVisibility] = useState(true);
  return (
    <div style={{ marginRight: 60, marginTop: 40 }}>
      <div style={{ width: '100%', textAlign: 'right' }}>
        <Button isSize="small" onClick={() => setVisibility(!show)}>
          {show ? 'Hide Code' : 'Show Code'}
        </Button>
      </div>
      {show && (
        <div style={{ width: '100%', fontSize: 14 }}>
          <SyntaxHighlighter language="diff" style={diff}>
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
