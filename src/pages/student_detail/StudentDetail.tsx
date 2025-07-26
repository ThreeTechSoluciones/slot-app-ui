import { HeaderProperty, InformationContainer, Label, MainContainer, NotFoundStudentMessage, PaymentInfo, PaymentsContainer, PaymentsTable, Row, StudentInfo, StudentInfoContainer, SubTitle, TableBody, TableHeader, Title } from './StudentDetail.styles';
import { formatCurrency } from '../../utils/Formatter';
import { useLocation } from 'react-router';
import { useGetStudentByIdQuery } from '../../app/services/StudentService';
import CheckIcon from '../../assets/check.webp'

const StudentDetail = () => {

  const { studentId } = useLocation().state;
  const { data: student, isError } = useGetStudentByIdQuery(studentId)

  if (isError || !student) return (
    <div>
      <NotFoundStudentMessage>
        Ocurrió un error al buscar la información del alumno. <br />
        Intente nuevamente
      </NotFoundStudentMessage>
    </div>
  )

  return (
    <MainContainer>
      <Title>ALUMNO: {student.name} {student.lastName}</Title>
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
            <Label>Numero de teléfono:</Label>
            <StudentInfo>{student.cellphoneNumber}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Patologías:</Label>
            <StudentInfo>{student.pathologies}</StudentInfo>
          </InformationContainer>
        
        </div>
        <div>
          <SubTitle>Información de su plan</SubTitle>
          <InformationContainer>
            <Label>Tipo de plan:</Label>
            <StudentInfo>{student.planType}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Dias a la semana:</Label>
            <StudentInfo>{student.classesPerWeek}</StudentInfo>
          </InformationContainer>
          <InformationContainer>
            <Label>Día de pago:</Label>
            <StudentInfo>{student.paymentDay || student.planType}</StudentInfo>
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
                <PaymentInfo>{payment.paymentDate}</PaymentInfo>
                <PaymentInfo>{formatCurrency(payment.amount)}</PaymentInfo>
                <PaymentInfo 
                  color={payment.status === 'Vencido' ? 'red' : 'black'}
                >{payment.status}</PaymentInfo>
                <PaymentInfo>{payment.paymentDate && <img 
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