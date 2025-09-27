import { useState } from "react";
import StudentData from "../forms/studentDataForm/StudentData";
import PaymentData from "../forms/paymentDataForm/PaymentData";
import PlanData from "../forms/planDataForm/PlanData";
import { useCreateStudentMutation } from "../../../app/services/StudentService";
import useAuthentication from "../../../hooks/useAuthentication";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import type { CreateStudentRequest } from "../../../app/types/requests/CreateStudentRequest.type";
import {TitleContainer,
        Title,
        MainContainer
}from "./CreateStudent.styles";

export interface StudentDataProps  {
    name:string;
    lastName:string;
    dni:string;
    cellphoneNumber: string;
    birthday: string;
    pathologies?: string | null;
}

export interface PaymentDataProps {
    paymentPlanName:string;
    extraClasses?: number|null|undefined;
    classPrice?:number|null|undefined;
    paymentDay?: number |undefined;
}

export interface PlanDataProps {
    planId: string;
}


function CreateStudent() {
  const [studentData, setStudentData] = useState<StudentDataProps | undefined>(undefined);
  const [paymentData, setPaymentData] = useState<PaymentDataProps|undefined>(undefined);
  const [planData, setPlanData] = useState <PlanDataProps|undefined>(undefined)

  const [count, setCount] = useState<number>(1)

  const [createStudent]=useCreateStudentMutation();

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

    return (
        <MainContainer>
            <TitleContainer>
                    <Title>REGISTRAR NUEVO ALUMNO</Title>
            </TitleContainer>
            {count == 1 && <StudentData 
                    createStudentCall={handleStudentDataForm}
                    studentData={studentData} 
                /> 
            }
            {count == 2 && <PaymentData
                        createStudentCall={handlePaymentDataForm}
                        paymentData={paymentData}
                        stepBack={stepBack}
                />   
            }
            {count == 3 && <PlanData
                        createStudentCall={handlePlanDataForm}
                        planData={planData}
                        stepBack={stepBack}
                />   
            }
        </MainContainer>
    )
}
export default CreateStudent