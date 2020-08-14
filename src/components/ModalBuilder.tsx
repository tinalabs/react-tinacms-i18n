import React from 'react';
// import * as ReactDom from 'react-dom';
import {
  Modal,
  ModalPopup,
  ModalHeader,
  ModalBody,
  ModalActions,
} from 'tinacms';
import { StyleReset, Button } from '@tinacms/styles';

export interface ModalBuilderProps {
  title: string;
  message: string;
  error?: string;
  actions: any[];
  close(): void;
}

export const ModalBuilder: React.FC<ModalBuilderProps> = (
  modalProps: ModalBuilderProps
) => {
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
};
