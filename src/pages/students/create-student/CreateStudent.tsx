import { useState } from "react";
import StudentData, { type StudentDataProps } from "../forms/studentDataForm/StudentData";
import PaymentData, { type PaymentDataProps } from "../forms/paymentDataForm/PaymentData";
import PlanData, { type PlanDataProps } from "../forms/planDataForm/PlanData";
import { useCreateStudentMutation } from "../../../app/services/StudentService";
import useAuthentication from "../../../hooks/useAuthentication";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import type { CreateStudentRequest } from "../../../app/types/requests/CreateStudentRequest.type";
import {
  TitleContainer,
  Title,
  MainContainer
} from "./CreateStudent.styles";
import Stepper from "../../../components/stepper/Stepper";
import { MisAlumnos } from "../../../routes/RoutesUtils";



function CreateStudent() {
  const [studentData, setStudentData] = useState<StudentDataProps | undefined>(undefined);
  const [paymentData, setPaymentData] = useState<PaymentDataProps | undefined>(undefined);
  const [planData, setPlanData] = useState<PlanDataProps | undefined>(undefined)
  const [createStudent] = useCreateStudentMutation();
  const { userId } = useAuthentication()

  const handleStudentDataForm = (data: StudentDataProps) => {
    let formattedBirthday = data.birthday;

    if (data.birthday) {
      const date = new Date(data.birthday);
      formattedBirthday = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    }

    setStudentData({
      ...data,
      birthday: formattedBirthday,
    });
  };

  const handlePaymentDataForm = (data: PaymentDataProps) => {
    setPaymentData(data);
  }

  const navigate = useNavigate();

  const handlePlanDataForm = async (data: PlanDataProps) => {

    setPlanData(data)

    if (!userId || !studentData || !paymentData || !data) return;

    const createStudentRequest: CreateStudentRequest = {
      ...studentData,
      ...paymentData,
      ...data,
      admissionDate: new Date(),
      userId
    }

    await createStudent(createStudentRequest)
      .unwrap()
      .then(() => {
        navigate(MisAlumnos);
        toast.success("El estudiante ha sido registrado");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error en la creación del estudiante");
      })
  };

  const steps = [
    {
      title: "Datos personales",
      component: StudentData,
      props: { onNext: handleStudentDataForm, data: studentData }
    },
    {
      title: "Datos del pago",
      component: PaymentData,
      props: { onNext: handlePaymentDataForm, data: paymentData }
    },
    {
      title: "Datos del turno",
      component: PlanData,
      props: { onNext: handlePlanDataForm, data: planData }
    }
  ];

  return (
    <MainContainer>
      <TitleContainer>
        <Title>REGISTRAR NUEVO ALUMNO</Title>
      </TitleContainer>
      <Stepper steps={steps} onCancel={() => navigate(MisAlumnos)} />
    </MainContainer>
  )
}
export default CreateStudent