import { MOCKED_STUDENT } from '../../mocks/students';
import { HeaderProperty, InformationContainer, Label, MainContainer, PaymentInfo, PaymentsContainer, PaymentsTable, Row, StudentInfo, StudentInfoContainer, SubTitle, TableBody, TableHeader, Title } from './StudentDetail.styles';
import CheckIcon from '../../assets/check.webp'
import { formatCurrency } from '../../utils/Formatter';

const StudentDetail = () => {

  const student = MOCKED_STUDENT;

  

  return (
    <MainContainer>
      <Title>ALUMNO: {student.name} {student.lastname}</Title>
      <StudentInfoContainer>
        <div>
          <SubTitle>Información personal</SubTitle>
          <InformationContainer>
            <Label>Fecha de nacimiento:</Label>
            <StudentInfo>{student.birthday}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Fecha de ingreso:</Label>
            <StudentInfo>{student.admissionDate}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Direccion:</Label>
            <StudentInfo>{student.address}</StudentInfo>
          </InformationContainer>
        
        </div>
        <div>
          <SubTitle>Información de su plan</SubTitle>
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
        <SubTitle>PAGOS</SubTitle>
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
              <Row key={payment.number}>
                <PaymentInfo>{payment.number}</PaymentInfo>
                <PaymentInfo>{payment.date}</PaymentInfo>
                <PaymentInfo>{formatCurrency(payment.amount)}</PaymentInfo>
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