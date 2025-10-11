import {
  InformationContainer,
  Label,
  MainContainer,
  StudentNameContainer,
  HeaderBoxes,
  AllInformationContainer,
  PaymentInfoContainer,
  NotFoundStudentMessage,
  InfoBoxesContainer,
  StudentInfo,
  StudentInfoContainer,
  SubTitle,
  Title,
} from "./StudentDetail.styles";
import { useLocation } from "react-router";
import { useGetStudentByIdQuery } from "../../app/services/StudentService";
import StudentIcon from "../../assets/student-icon.svg";
import BackIcon from "../../assets/back-icon.svg";
import InfoIcon from "../../assets/info-icon.svg";

const StudentDetail = () => {
  const { studentId } = useLocation().state;
  const { data: student, isError } = useGetStudentByIdQuery(studentId);
  console.log(student);
  if (isError || !student)
    return (
      <div>
        <NotFoundStudentMessage>
          Ocurrió un error al buscar la información del alumno. <br />
          Intente nuevamente
        </NotFoundStudentMessage>
      </div>
    );

  return (
    <MainContainer>
      <Title>
        <img src={BackIcon} alt="back-icon"></img>
        DETALLE DEL ALUMNO
      </Title>
      <StudentNameContainer>
        <Title>
          <img src={StudentIcon} alt="student-icon"></img>
          {student.name} {student.lastName}
        </Title>
      </StudentNameContainer>

      <InfoBoxesContainer>
        <StudentInfoContainer>
          <HeaderBoxes>
            <SubTitle>
              <img
                src={StudentIcon}
                alt="student-icon"
                width={24}
                height={24}
              ></img>
              Datos del alumno
            </SubTitle>
          </HeaderBoxes>
          <AllInformationContainer>
            <InformationContainer>
              <Label>Nombre</Label>
              <StudentInfo>{student.name}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Apellido</Label>
              <StudentInfo>{student.lastName}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>DNI</Label>
              <StudentInfo>{student.dni}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Fecha de ingreso</Label>
              <StudentInfo>{student.admissionDate}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Fecha de nacimiento</Label>
              <StudentInfo>{student.birthday}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Edad</Label>
              <StudentInfo>{student.age}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Numero de teléfono</Label>
              <StudentInfo>{student.cellphoneNumber}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Patologías</Label>
              <StudentInfo>{student.pathologies}</StudentInfo>
            </InformationContainer>
          </AllInformationContainer>
        </StudentInfoContainer>
        <PaymentInfoContainer>
          <HeaderBoxes>
            <SubTitle>
              <img src={InfoIcon} alt="info-icon"></img>
              Datos de pago y estados
            </SubTitle>
          </HeaderBoxes>
          <AllInformationContainer>
            <InformationContainer>
              <Label>Forma de pago</Label>
              <StudentInfo>{student.paymentPlan}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Estado del alumno</Label>
              <StudentInfo>
                {student.status ? "Activo" : "Inactivo"}
              </StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Día de pago</Label>
              <StudentInfo>
                {student.paymentDay ||
                  student.paymentPlan == "Principio de mes"}
              </StudentInfo>
            </InformationContainer>

            <InformationContainer>
              <Label>Situación del alumno</Label>
              <StudentInfo>{student.situation}</StudentInfo>
            </InformationContainer>
          </AllInformationContainer>
        </PaymentInfoContainer>
      </InfoBoxesContainer>

      {/* <PaymentsContainer>
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
            {(student.payments || []).map((payment) => (
              <Row key={payment.number}>
                <PaymentInfo>{payment.number}</PaymentInfo>
                <PaymentInfo>{payment.paymentDate}</PaymentInfo>
                <PaymentInfo>{formatCurrency(payment.amount)}</PaymentInfo>
                <PaymentInfo
                  color={payment.status === "Vencido" ? "red" : "black"}
                >
                  {payment.status}
                </PaymentInfo>
                <PaymentInfo>
                  {payment.paymentDate && <img src={CheckIcon} width={30} />}
                </PaymentInfo>
              </Row>
            ))} */}
      {/* </TableBody> */}
      {/* </PaymentsTable> */}
      {/* </PaymentsContainer> */}
    </MainContainer>
  );
};

export default StudentDetail;
