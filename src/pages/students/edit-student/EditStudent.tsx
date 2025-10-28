import StudentData, { type StudentDataProps } from "../forms/studentDataForm/StudentData"
import PaymentData, { type PaymentDataProps } from "../forms/paymentDataForm/PaymentData"
import { useGetStudentByIdQuery, useUpdateStudentMutation } from "../../../app/services/StudentService"
import useAuthentication from "../../../hooks/useAuthentication";
import { useState, type JSX } from "react";
import PlanData, { type PlanDataProps } from "../forms/planDataForm/PlanData";
import { useLocation } from "react-router";
import type { UpdateStudentRequest } from "../../../app/types/requests/UpdateStudentRequest.type";
import { useParams } from "react-router-dom";
interface StudentSaveData {
    name: string;
    lastName: string;
    dni: string;
    cellphoneNumber: string;
    birthday: string;
    pathologies?: string | null;
}



function EditStudent() {

    const { userId } = useAuthentication();

    const [studentData, setStudentData] = useState<StudentDataProps | undefined>(undefined);

    const [paymentData, setPaymentData] = useState<PaymentDataProps | undefined>(undefined);

    /* const [planData, setPlanData] = useState<PlanDataProps | undefined>(undefined); */

    const { studentId, numberOfStep } = useParams();

    const numberOfStepNum = numberOfStep ? parseInt(numberOfStep) : null;

    const { data: studentSaveData } = useGetStudentByIdQuery(studentId!);


    const showData = (studentSaveData: StudentDataProps) => {
        let formattedBirthday = studentSaveData.birthday;

        if (studentSaveData.birthday) {
            const [day, month, year] = studentSaveData.birthday.split("/").map(Number);
            const date = new Date(year, month - 1, day + 1);
            formattedBirthday = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            console.log(formattedBirthday);
        }

        return {
            name: studentSaveData.name,
            lastName: studentSaveData.lastName,
            dni: studentSaveData.dni,
            cellphoneNumber: studentSaveData.cellphoneNumber,
            birthday: formattedBirthday,
            pathologies: studentSaveData.pathologies ?? undefined,
        };
    }




    const [updateStudent] = useUpdateStudentMutation();

    if (!studentSaveData) {
        return <p>Cargando datos del estudiante...</p>;
    }

    const handleStudentData = (data: StudentDataProps) => {
        setStudentData(data);
        const updateData = {
            studentId: studentId!,
            userId: userId!,
            ...studentSaveData,
            ...studentData,
        }
        updateStudent(updateData);
    }

    const handlePaymentData = (data: PaymentDataProps) => {
        setPaymentData(data);
        const updateData = {
            studentId: studentId!,
            userId: userId!,
            ...studentSaveData,
            ...paymentData,
        }
        updateStudent(updateData);
    }

    /*  const handlePlanData = (data: PlanDataProps) => {
         setPlanData(data);
         const updateData: UpdateStudentRequest = {
             studentId: studentId!,
             userId: userId!,
             ...studentSaveData,
             ...planData,
         }
         updateStudent(updateData);
     } */

    const forms: Record<number, JSX.Element> = {
        1: <StudentData onSubmit={handleStudentData} data={showData(studentSaveData)} />,
        2: <PaymentData onSubmit={handlePaymentData} data={studentSaveData} />,
        /*  3: <PlanData onSubmit={handlePlanData} data={planData} />, */
    };
    if (!numberOfStepNum) {
        return <p>Paso no válido</p>;
    }

    return forms[numberOfStepNum] ?? <p>Paso no válido</p>;
};
export default EditStudent;