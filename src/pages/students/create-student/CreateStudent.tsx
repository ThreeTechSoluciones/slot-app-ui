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


function CreateStudent() {
  const [studentData, setStudentData] = useState<StudentDataProps | undefined>(undefined);
  const [paymentData, setPaymentData] = useState<PaymentDataProps|undefined>(undefined);
  const [planData, setPlanData] = useState <PlanDataProps|undefined>(undefined)

  const [count, setCount] = useState<number>(1)

  const [createStudent]=useCreateStudentMutation();

  const Navigate= useNavigate();

  const {userId}= useAuthentication()

    const handleStudentDataForm = (data: StudentDataProps) => {
        setStudentData(data);
        setCount(2);
    }

    const handlePaymentDataForm = (data:PaymentDataProps)=>{
        setPaymentData(data);
        setCount(3)
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

    const stepBack = ()=>{
        setCount(count - 1)
    }

     const FormComponentMap : Map <number, JSX.Element> = new Map([
      [1, <StudentData onNext={handleStudentDataForm} onBack ={()=>Navigate("/home")} data={studentData}/>],
      [2, <PaymentData onNext={handlePaymentDataForm} onBack={stepBack} data={paymentData}/>],
      [3, <PlanData onNext={handlePlanDataForm} onBack={stepBack} data={planData}/>]
     ])

    return (
        <MainContainer>
            <TitleContainer>
                    <Title>REGISTRAR NUEVO ALUMNO</Title>     
            </TitleContainer>
             { FormComponentMap.get(count) }
          
        </MainContainer>
    )
}
export default CreateStudent