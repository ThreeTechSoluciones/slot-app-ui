import styled from "styled-components";
export const StudentsContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  min-height: 100vh;
`;

export const FiltersContainer = styled.div`
  display: flex;
  margin: 0px 80px;
`;

export const LeftContainer = styled.div`
  display: flex;
  gap: 26px;
`;

export const RightContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  flex-wrap: wrap;
`;

const CommonStatusAndSituation = styled.p`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 136px;
  height: 32px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 10px;
  font-weight: 700;
`;

export const SituationText = styled(CommonStatusAndSituation)<{
  $status: string;
}>`
  background-color: ${({ $status }) =>
    $status === "En término" ? "#20C92B" : "#E32626"};
`;

export const StatusText = styled(CommonStatusAndSituation)<{
  $isActive: boolean;
}>`
  background-color: ${({ $isActive }) => ($isActive ? "#20C92B" : "#7C7C7C")};
`;
