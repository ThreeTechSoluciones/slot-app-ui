import { IconContainer, MainContainer, StyledIcon, Text } from './RegisterAbsence.styles';
import StudentIcon from '../../../assets/student-icon.svg';

export default function RegisterAbsence() {
  return (
    <MainContainer>
      <IconContainer>
        <StyledIcon src={StudentIcon} />
      </IconContainer>
      <Text>{`¿Deseas registrar la inasistencia del estudiante?`}</Text>
    </MainContainer>
  );
}
