import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  width: 100%;
  height: 100%;
`

export const StudentInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  background-color:rgba(125, 125, 125, 0.1);
  padding: 10px 0px;
  @media (max-width: 768px) {
    background-color: white;
    flex-direction: column;
  }
`

export const InformationContainer = styled.div`
  display: flex;
  margin: 0px;
`

export const Label = styled.p`
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
  border-bottom: 0.5px solid black;
  margin: 5px;
  margin-right: 8px;
  width: fit-content;
`

export const StudentInfo = styled.p`
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
  margin: 5px;
`

export const PaymentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`

export const PaymentsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
`

export const TableHeader = styled.thead`
  background-color: #7d7d7d;
`

export const HeaderProperty = styled.th`
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
  color: white;
`

export const TableBody = styled.tbody`
`

export const PaymentInfo = styled.th<{ color?: string; }>`
  border-bottom: 1px solid rgb(171, 160, 160);
  font-size: clamp(0.5rem, 1vw + 0.5rem, 2rem);
  color: ${ props => props.color || 'black' };
  font-weight: 500;
`

export const Row = styled.tr`
`
export const Title = styled.h1`
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
  border-bottom: 1px solid rgb(171, 160, 160);
  width: fit-content;
`

export const SubTitle = styled.h2`
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
  width: fit-content;
  margin: 0px;
  margin-bottom: 10px;
`