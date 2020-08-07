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
  CMS,
} from 'tinacms';
import { StyleReset, Button } from '@tinacms/styles';

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

const LocaleModal = ({ cms }: { cms: CMS }) => {
  return (
    <ModalBuilder
      message="asdf"
      title="No locale for exists to you want to create one"
      close={() => {
        cms.disable();
      }}
      actions={[
        {
          name: 'Yes',
          action: () => {
            console.log('yes');
          },
        },
        {
          name: 'No',
          action: () => {
            console.log('asdf');
          },
        },
      ]}
    />
  );
};

export const LocaleModelRenderer = ({
  data,
}: {
  data?: any;
}): React.ReactElement | null => {
  const cms = useCMS();

  return cms.enabled && (!data || Object.keys(data).length == 0) ? (
    <LocaleModal cms={cms} />
  ) : null;
};
