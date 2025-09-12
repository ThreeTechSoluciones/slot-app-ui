import styled from "styled-components";
export const StudentsContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  min-height: 100vh;
`;
interface StatusProps {
  $isActive: boolean;
}

export const StatusText = styled.strong<StatusProps>`
  background-color: ${(props) => (props.$isActive ? "#20C92B" : "#7C7C7C")};
  color: white;
  display: inline-block;
  width: 100px;
  text-align: center;
  padding: 2px 15px;
  font-size: 20px;
  border-radius: 10px;
  font-weight: 700;
`;
interface SituationProps {
  status: string;
}

export const SituationText = styled.strong<SituationProps>`
  background-color: ${(props) =>
    props.status === "Al día" ? "#20C92B" : "#E32626"};
  color: white;
  display: inline-block;
  width: 100px;
  text-align: center;
  padding: 2px 15px;
  font-size: 20px;
  border-radius: 10px;
  font-weight: 700;
`;
