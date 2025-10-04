import { useState, type JSX } from "react";
import StudentData, { type StudentDataProps } from "../forms/studentDataForm/StudentData";
import PaymentData, { type PaymentDataProps } from "../forms/paymentDataForm/PaymentData";
import PlanData, { type PlanDataProps } from "../forms/planDataForm/PlanData";
import { useCreateStudentMutation } from "../../../app/services/StudentService";
import useAuthentication from "../../../hooks/useAuthentication";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import type { CreateStudentRequest } from "../../../app/types/requests/CreateStudentRequest.type";
import {TitleContainer,
        Title,
        MainContainer
}from "./CreateStudent.styles";
import Stepper from "../../../components/stepper/Stepper";


function CreateStudent() {
  const [studentData, setStudentData] = useState<StudentDataProps | undefined>(undefined);
  const [paymentData, setPaymentData] = useState<PaymentDataProps|undefined>(undefined);
  const [planData, setPlanData] = useState <PlanDataProps|undefined>(undefined)

  

  const [createStudent]=useCreateStudentMutation();

  const Navigate= useNavigate();

  const {userId}= useAuthentication()

    const handleStudentDataForm = (data: StudentDataProps) => {
        setStudentData(data);
       
    }

    const handlePaymentDataForm = (data:PaymentDataProps)=>{
        setPaymentData(data);

    }

    const navigate = useNavigate();

    const handlePlanDataForm = (data:PlanDataProps)=>{
        
        setPlanData(data)

        if(!userId || !studentData || !paymentData || !planData) return;

        const createStudentRequest: CreateStudentRequest = {
            ...studentData,
            ...paymentData,
            ...planData,
            admissionDate: new Date(),
            userId
        }
        createStudent(createStudentRequest)
            .unwrap()
            .then(() => {
              navigate("/home");
              toast.success("El estudiante ha sido registrado");
            })
            .catch(() => {
              toast.error("Ha ocurrido un error en la creación del estudiante");
            });
          };

      const steps = [
        {title: "Datos personales", element: <StudentData onNext={handleStudentDataForm} data={studentData}/> },
        // {title: "Datos del pago", element: <PaymentData onNext={handlePaymentDataForm} data={paymentData}/>},
        // {title: "Datos del turno", element: <PlanData onNext={handlePlanDataForm}  data={planData}/> }
      ];

    return (
        <MainContainer>
            <TitleContainer>
                    <Title>REGISTRAR NUEVO ALUMNO</Title>     
            </TitleContainer>
           <Stepper steps={steps}/>
          
        </MainContainer>
    )
}
export default CreateStudent