import { IconContainer, MainContainer, StyledIcon, Text } from './RegisterAbsence.styles';
import StudentIcon from '../../../assets/user-icon.svg';

export default function RegisterAbsence({ studentName }: { studentName?: string }) {
  return (
    <MainContainer>
      <IconContainer>
        <StyledIcon src={StudentIcon} />
      </IconContainer>
      <Text>
        ¿Deseas registrar la inasistencia{' '}
        {studentName ? (
          <>
            de <strong>{studentName}</strong>
          </>
        ) : (
          'del estudiante'
        )}
        ?
      </Text>
    </MainContainer>
  );
}
