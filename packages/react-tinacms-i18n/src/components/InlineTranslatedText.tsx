import React from 'react';
import styled from 'styled-components';
import { InlineField, FocusRing, InlineTextProps } from 'react-tinacms-inline';
import { CMS, useCMS } from 'tinacms';

export interface InlineTranslatedTextProps extends InlineTextProps {
  children?: React.ReactNode;
  placeholder?: string;
}

export function InlineTranslatedText({
  name,
  className,
  focusRing = true,
  placeholder,
  children,
}: InlineTranslatedTextProps) {
  const cms: CMS = useCMS();

  return (
    <InlineField name={name}>
      {({ input }) => {
        if (cms.enabled) {
          if (!focusRing) {
            return (
              <Input
                type="text"
                {...input}
                placeholder={placeholder}
                className={className}
              />
            );
          }

          return (
            <FocusRing name={name} options={focusRing}>
              <Input
                type="text"
                {...input}
                placeholder={placeholder}
                className={className}
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

const Input = styled.input`
  width: 100%;
  display: block;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  box-sizing: border-box;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  max-width: inherit;
  background-color: inherit;
  text-align: inherit;
  outline: none;
  resize: none;
  border: none;
  overflow: visible;
  position: relative;
  -ms-overflow-style: none;
`;
