import styled from 'styled-components';

export const Container = styled.div<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ disabled }) =>
    disabled &&
    `
      filter: grayscale(1);
      opacity: 0.6;
    `}
`;
