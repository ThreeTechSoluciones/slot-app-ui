// export const plansContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   padding: 2rem;
//   justify-content: space-evenly;
// `;

// export const Title = styled.h1`
//   margin-bottom: 0.5rem;
//   font-weight: bold;
//   font-size: 20px;
//   text-align: center;
// `;
import styled from "styled-components";
import { FONT_FAMILY } from "../../utils/Stylesheet";

export const PlansContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-family: ${FONT_FAMILY};
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  margin: 0;
`;

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
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
  gap: 16px;
  align-items: center;
`;
