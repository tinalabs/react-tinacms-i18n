import * as React from 'react';
import { useCMS } from 'tinacms';

export interface PromptPlugin<ComponentProps = Record<string, any>> {
  __type: 'prompt';
  name: string;
  Component(props: ComponentProps): React.ReactElement;
  condition: boolean;
  props?: ComponentProps;
}

export const PromptRenderer = (): React.ReactElement | null => {
  const cms = useCMS();
  const prompts = cms.plugins.getType<PromptPlugin>('prompt').all();

  return cms.enabled && prompts ? (
    <>
      {prompts
        .filter((prompt) => prompt.condition)
        .map((prompt, i) => {
          const Component = prompt.Component;
          return <Component key={i} {...prompt.props} />;
        })}
    </>
  ) : null;
};
