import * as React from 'react';
import { useCMS } from 'tinacms';
import { PromptPlugin } from '../plugins';
import { ModalBuilder } from '../components';

interface ModalProps {
  title?: string;
  onClose: () => void;
  actions: {
    name: string;
    onClick: () => void;
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

const defaultFunc = () => {
  console.log('asdf');
};

export const useLocalePromptPlugin = (
  data: Record<string, any>,
  options?: Partial<
    Omit<ModalProps, 'actions'> & {
      onYes: () => void;
      onNo: () => void;
    }
  >
): void => {
  const cms = useCMS();
  const hasData = data && Object.keys(data).length > 0;
  cms.plugins.add<PromptPlugin<ModalProps>>({
    __type: 'prompt',
    Component: LocaleModal,
    name: 'asdf',
    condition: !hasData,
    props: {
      message: options?.message,
      onClose: options?.onClose || cms.disable,
      actions: [
        {
          onClick: options?.onYes || defaultFunc,
          name: 'Yes',
        },
        { onClick: options?.onNo || cms.disable, name: 'No' },
      ],
    },
  });
};
