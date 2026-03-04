import type { JSX } from 'react';

export enum ModalType {
  CREATE = 'Create',
  EDIT_START_TIME = 'EditStartTime',
  EDIT_CAPACITY = 'EditCapacity',
}

export type ModalConfig = {
  contentRef: React.RefObject<any>;
  content: JSX.Element;
  onConfirm: () => void;
};
