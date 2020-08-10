import * as React from 'react';
import styled from 'styled-components';
import { InlineField, FocusRing, InlineTextProps } from 'react-tinacms-inline';
import { CMS, useCMS } from 'tinacms';
import TextareaAutosize from 'react-textarea-autosize';

export interface InlineTranslatedTextAreaProps extends InlineTextProps {
  children?: React.ReactNode;
  placeholder?: string;
}

export function InlineTranslatedTextArea({
  name,
  className,
  focusRing = true,
  placeholder,
  children,
}: InlineTranslatedTextAreaProps) {
  const cms = useCMS();

  return (
    <InlineField name={name}>
      {({ input }) => {
        if (cms.enabled) {
          if (!focusRing) {
            return (
              <Textarea
                className={className}
                {...input}
                rows={1}
                placeholder={placeholder}
              />
            );
          }

          return (
            <FocusRing name={name} options={focusRing}>
              <Textarea
                className={className}
                {...input}
                rows={1}
                placeholder={placeholder}
              />
            </FocusRing>
          );
        }
        if (children) {
          return <>{children}</>;
        }
        return <>{input.value}</>;
      }}
    </InlineField>
  );
}

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  word-wrap: break-word;
  display: block;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  box-sizing: border-box;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0 auto;
  max-width: inherit;
  background-color: inherit;
  text-align: inherit;
  outline: none;
  resize: none;
  border: none;
  overflow: visible;
  position: relative;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
