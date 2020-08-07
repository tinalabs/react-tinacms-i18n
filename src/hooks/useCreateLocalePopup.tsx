// import styled from 'styled-components';
import * as React from 'react';
// import * as ReactDom from 'react-dom';
import {
  useCMS,
  Modal,
  ModalPopup,
  ModalHeader,
  ModalBody,
  ModalActions,
} from 'tinacms';
import { StyleReset, Button } from '@tinacms/styles';

// TODO: organize this code
interface ModalBuilderProps {
  title: string;
  message: string;
  error?: string;
  actions: any[];
  close(): void;
}

export function ModalBuilder(modalProps: ModalBuilderProps) {
  return (
    <StyleReset>
      <Modal>
        <ModalPopup>
          <ModalHeader close={modalProps.close}>{modalProps.title}</ModalHeader>
          <ModalBody padded>
            <p>{modalProps.message}</p>
            {/* {modalProps.error && <ErrorLabel>{modalProps.error}</ErrorLabel>} */}
          </ModalBody>
          <ModalActions>
            {modalProps.actions.map((action: any, key) => (
              <Button {...action} key={key}>
                {action.name}
              </Button>
            ))}
          </ModalActions>
        </ModalPopup>
      </Modal>
    </StyleReset>
  );
}

interface ModalProps {
  title?: string;
  onClose: () => void;
  actions: {
    name: string;
    action: () => void;
  }[];
  message?: string;
}

const LocaleModal = ({
  title = 'No translation exists for this file to you want to create one?',
  onClose,
  actions,
  message,
}: ModalProps) => {
  return (
    <ModalBuilder
      message={message || ''}
      title={title}
      close={onClose}
      actions={actions}
    />
  );
};

export interface PromptPlugin<ExtraProps = Record<string, any>> {
  __type: 'prompt';
  name: string;
  Component(props: ExtraProps): React.ReactElement;
  props?: ExtraProps;
}

// export const LocaleModelRenderer = ({
//   data,
// }: {
//   data?: any;
// }): React.ReactElement | null => {
//   const cms = useCMS();

//   return cms.enabled && (!data || Object.keys(data).length == 0) ? (
//     <LocaleModal />
//   ) : null;
// };

export const useLocalePropmtPlugin = () => {
  const cms = useCMS();
  cms.plugins.add<PromptPlugin<ModalProps>>({
    __type: 'prompt',
    Component: LocaleModal,
    name: 'asdf',
    props: {
      onClose: cms.disable,
      actions: [
        {
          action: () => {
            console.log('asdf');
          },
          name: 'Yes',
        },
        { action: cms.disable, name: 'No' },
      ],
    },
  });
};

export const PromptRenderer = ({
  data,
}: {
  data?: any;
}): React.ReactElement | null => {
  const cms = useCMS();
  const prompts = cms.plugins.getType<PromptPlugin>('prompt').all();

  return cms.enabled && (!data || Object.keys(data).length == 0) ? (
    <>
      {prompts.map((prompt, i) => {
        const Component = prompt.Component;
        return <Component key={i} {...prompt.props} />;
      })}
    </>
  ) : null;
};
