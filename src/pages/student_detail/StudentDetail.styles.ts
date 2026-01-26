import styled from "styled-components";
import {
  FONT_FAMILY,
  SUCCESS_COLOR,
  NEUTRAL_COLOR,
  DANGER_COLOR,
} from "../../utils/Stylesheet";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 20px;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
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
  font-family: ${FONT_FAMILY};
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
export const ShiftInfoContainer = styled(StudentInfoContainer)`
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
  font-family: ${FONT_FAMILY};
  font-size: 12px;
  margin: 0px;
  width: fit-content;
`;

export const StudentNameContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 71rem;
`;

export const StudentInfo = styled.p`
  font-size: 16px;
  margin: 0px;
  text-align: justify;
  overflow-wrap: break-word;
`;
export const StudentStatusStyle = styled.p<{ $status: boolean }>`
  margin: 0;
  color: ${({ $status }) => ($status ? SUCCESS_COLOR : NEUTRAL_COLOR)};
`;

export const StudentSituationStyle = styled.p<{ $situation: string }>`
  margin: 0;
  color: ${({ $situation }) =>
    $situation === "En término" ? SUCCESS_COLOR : DANGER_COLOR};
`;
export const TitleContainer = styled.div`
  display: flex;
  margin-left: 76px;
  gap: 24px;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: flex-start;
  width: 100%;
`;

export const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1rem;
  width: fit-content;
  margin: 0px;
  margin-left: 2rem;
`;
export const SlotTitleContainer = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 0;
`;
export const PlanContainer = styled.p`
  font-size: 12px;
  font-family: ${FONT_FAMILY};
  margin: 0;
  padding-left: 32px;
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
`;

export const NotFoundStudentMessage = styled.p`
  font-size: clamp(1rem, 2vw + 0.5rem, 3rem);
`;
