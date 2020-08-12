import * as React from 'react';
import { useCMS } from 'tinacms';
/**
 * Prompt plugin: This interface defines the contract that registers the prompts
 * @template ComponentProps
 */
export interface PromptPlugin<ComponentProps = Record<string, any>> {
  __type: 'prompt';
  /**
   * The name of the plugin
   */
  name: string;
  /**
   * The component that will be rendered
   * @param props The used components props
   */
  Component(props: ComponentProps): React.ReactElement;
  /**
   * If this condition is true and we are in edit mode then the prompt will render
   */
  condition: boolean;
  /**
   * The props that are give to the component {...props}
   */
  props?: ComponentProps;
}

/**
 * This component renders all the prompt plugins that are registered.
 */
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
