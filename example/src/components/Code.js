import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function Code(props) {
  return (
    <div style={{ marginTop: 40 }}>
      {props.show && (
        <div style={{ width: '100%', fontSize: 14 }}>
          <SyntaxHighlighter language="jsx" style={prism}>
            {props.children}
          </SyntaxHighlighter>
        </div>
      )}
      {props.show && props.readMoreLink && (
        <a href={props.readMoreLink} target="_blank" rel="noopener noreferrer">
          {props.readMoreText}
        </a>
      )}
    </div>
  );
}
