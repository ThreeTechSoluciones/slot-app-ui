import { MOCKED_STUDENT } from '../../mocks/students';
import { HeaderProperty, InformationContainer, Label, MainContainer, PaymentInfo, PaymentsContainer, PaymentsTable, Row, StudentInfo, StudentInfoContainer, SubTitle, TableBody, TableHeader, Title } from './StudentDetail.styles';
import CheckIcon from '../../assets/check.webp'

const StudentDetail = () => {

  const student = MOCKED_STUDENT;

  return (
    <MainContainer>
      <Title>Informacion del alumno</Title>
      <StudentInfoContainer>
        <div>
          <SubTitle>Informacion personal</SubTitle>
          <InformationContainer>
            <Label>Nombre: </Label>
            <StudentInfo>{student.name} {student.lastname}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Fecha de nacimiento:</Label>
            <StudentInfo>{student.birthday}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Fecha de ingreso:</Label>
            <StudentInfo>{student.admissionDate}</StudentInfo>
          </InformationContainer>
        
        </div>
        <div>
          <SubTitle>Informacion de su plan</SubTitle>
          <InformationContainer>
            <Label>Tipo de plan:</Label>
            <StudentInfo>{student.plan.planType}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Dias a la semana:</Label>
            <StudentInfo>{student.plan.daysPerWeek}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Día de pago:</Label>
            <StudentInfo>{student.plan.paymentDueDate}</StudentInfo>
          </InformationContainer>
        </div>
      </StudentInfoContainer>
      <PaymentsContainer>
        <SubTitle>Informacion de sus pagos</SubTitle>
        <PaymentsTable>
          <TableHeader>
            <tr>
              <HeaderProperty>Pago N°</HeaderProperty>
              <HeaderProperty>Fecha</HeaderProperty>
              <HeaderProperty>Monto</HeaderProperty>
              <HeaderProperty>Estado</HeaderProperty>
              <HeaderProperty>Pagado</HeaderProperty>
            </tr>
          </TableHeader>
          <TableBody>
            {student.payments.map((payment) => (
              <Row>
                <PaymentInfo>{payment.number}</PaymentInfo>
                <PaymentInfo>{payment.date}</PaymentInfo>
                <PaymentInfo>${payment.amount}</PaymentInfo>
                <PaymentInfo 
                  color={payment.status === 'Vencido' ? 'red' : 'black'}
                >{payment.status}</PaymentInfo>
                <PaymentInfo>{payment.payed && <img 
                  src={CheckIcon}
                  width={30}
                />}</PaymentInfo>
              </Row>
            ))}
          </TableBody>
        </PaymentsTable>
      </PaymentsContainer>
    </MainContainer>
  )
}

export default StudentDetail;