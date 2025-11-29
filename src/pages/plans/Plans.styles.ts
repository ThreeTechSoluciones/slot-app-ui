import styled from "styled-components";
import {} from "../../utils/Stylesheet";

export const PlansContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  margin-left: 80px;
  margin-bottom: 56px;
  margin-top: 56px;
`;

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 80px;
  flex-wrap: wrap;
`;

export const LeftContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

export const RightContainer = styled.div`
  display: flex;
  margin-right: 80px;
  align-items: center;
`;
