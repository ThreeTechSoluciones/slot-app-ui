import styled from "styled-components";

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
`;
export const ButtonWrapper = styled.div`
  margin-right: 16rem;
`;
export const HeaderBoxes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 1rem;
`;

export const EditIconStyles = styled.div`
  margin-left: auto;
  cursor: pointer;
`;
export const InfoBoxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 84px;
  flex-wrap: wrap;
`;
export const StudentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 448px;
  height: 312px;
  border: 2px solid black;
  border-radius: 1rem;
  @media (max-width: 768px) {
    background-color: white;
    flex-direction: column;
  }
`;

export const PaymentInfoContainer = styled(StudentInfoContainer)``;

export const AllInformationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  padding: 1rem;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

export const Label = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin: 0px;
  width: fit-content;
`;

export const StudentNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StudentInfo = styled.p`
  font-size: 16px;
  margin: 0px;
`;
export const StudentStatusStyle = styled.p<{ status: boolean }>`
  font-weight: bold;
  margin: 0;
  color: ${({ status }) => (status ? "#20C92B" : "#B92C2C")};
`;

export const StudentSituationStyle = styled.p<{ situation: string }>`
  font-weight: bold;
  margin: 0;
  color: ${({ situation }) =>
    situation === "En término" ? "#20C92B" : "#B92C2C"};
`;

export const Title = styled.h1<{ center?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  width: 100%;
  margin-left: 5rem;
`;

export const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1rem;
  width: fit-content;
  margin: 0px;
  margin-left: 2rem;
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
