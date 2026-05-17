import styled from 'styled-components';
import {
  SUCCESS_COLOR,
  NEUTRAL_COLOR,
  DANGER_COLOR,
  FONT_WEIGHT_BOLD,
  DEFAULT_FONT_SIZE,
  SMALL_FONT_SIZE,
  LARGE_FONT_SIZE,
  MEDIUM_FONT_SIZE,
} from '../../utils/Stylesheet';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 20px 20px 0px;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

export const ButtonWrapper = styled.div`
  margin-right: 16rem;
`;
export const HeaderBoxes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 12px;
  align-items: center;
`;

export const SlotPlanContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const EditIconStyles = styled.div`
  margin-left: auto;
  cursor: pointer;
`;

export const InfoBoxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px 80px;
  flex-wrap: wrap;
  max-width: 1200px;
`;
export const StudentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 630px;
  border: 2px solid black;
  border-radius: 1rem;
  @media (max-width: 768px) {
    background-color: white;
    flex-direction: column;
  }
`;

export const PaymentInfoContainer = styled(StudentInfoContainer)`
  width: 448px;
`;

export const AllInformationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  text-align: left;
  margin-bottom: 1rem;
`;
export const SlotInfoContainer = styled(StudentInfoContainer)`
  width: 1158px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 0;
`;
export const SearchNotFoundStyles = styled.div`
  display: grid;
  place-content: center;
  width: 100%;
  height: 100%;
`;
export const Label = styled.p`
  font-size: ${SMALL_FONT_SIZE};
  margin: 0px;
  width: fit-content;
`;

export const StudentNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 71rem;
  margin-top: 16px;
`;

export const Email = styled.p`
  font-size: ${MEDIUM_FONT_SIZE};
  color: ${NEUTRAL_COLOR};
  margin: 0;
  margin-left: 40px;
  margin-bottom: 16px;
`;
export const StudentInfo = styled.p`
  font-size: ${DEFAULT_FONT_SIZE};
  margin: 0px;
  text-align: justify;
  overflow-wrap: break-word;
`;
export const StudentStatusStyle = styled.p<{ $status: boolean }>`
  margin: 0;
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${({ $status }) => ($status ? SUCCESS_COLOR : NEUTRAL_COLOR)};
`;

export const StudentSituationStyle = styled.p<{ $situation: string }>`
  margin: 0;
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${({ $situation }) => ($situation === 'En término' ? SUCCESS_COLOR : DANGER_COLOR)};
`;
export const TitleContainer = styled.div`
  display: flex;
  margin-left: 76px;
  gap: 24px;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: ${LARGE_FONT_SIZE};
  justify-content: flex-start;
  width: 100%;
  margin: 0;
`;
export const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;
export const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1rem;
  width: fit-content;
  margin: 0px;
  margin-left: 2rem;
`;
export const SlotTitleContainer = styled.div`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 0;
`;
export const PlanContainer = styled.div`
  margin: 0;
  padding-left: 32px;
`;

export const AssignedPlan = styled.p`
  font-size: ${SMALL_FONT_SIZE};
  margin: 0px;
  font-weight: ${FONT_WEIGHT_BOLD};
`;
export const DaysPlan = styled.p`
  font-size: ${DEFAULT_FONT_SIZE};
  margin: 0px;
`;
export const SlotsContainer = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
`;
export const IconStyles = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 2;
  margin-bottom: 8px;
`;

export const NotFoundStudentMessage = styled.p`
  font-size: clamp(1rem, 2vw + 0.5rem, 3rem);
`;
