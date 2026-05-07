import styled from 'styled-components';

interface ContainerProps {
  $size: number;
}

export const Container = styled.div<ContainerProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  margin-top: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      filter 0.3s ease-in-out,
      transform 0.3s ease-in-out;
  }

  img:hover {
    filter: drop-shadow(0px 0px 8px #f0e21e);
    transform: scale(1.05);
  }
`;
