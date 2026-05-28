import React from 'react';
import { MessageStyle, QuestionStyle, InfoBox } from './ConfirmDialog.styles';
import QuestionMarkIcon from '../../assets/question-mark-icon.svg';

type ConfirmDialogProps = {
  message: React.ReactNode;
};

export function ConfirmDialog({ message }: ConfirmDialogProps) {
  return (
    <InfoBox>
      <QuestionStyle>
        <img src={QuestionMarkIcon} alt="question-mark-icon" />
      </QuestionStyle>
      <MessageStyle>{message}</MessageStyle>
    </InfoBox>
  );
}
