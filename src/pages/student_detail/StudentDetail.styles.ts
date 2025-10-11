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

export const HeaderBoxes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 1rem;
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

export const Title = styled.h1`
  font-size: 24px;
  align-items: left;
  justify-content: left;
  width: 100%;
  margin-left: 6rem;
`;

export const SubTitle = styled.h2`
  font-size: 1rem;
  width: fit-content;
  margin: 0px;
  margin-left: 2rem;
`;

export const NotFoundStudentMessage = styled.p`
  font-size: clamp(1rem, 2vw + 0.5rem, 3rem);
`;
