import StudentData, { type StudentDataProps } from "../forms/studentDataForm/StudentData"
import PaymentData, { type PaymentDataProps } from "../forms/paymentDataForm/PaymentData"
import { useGetStudentByIdQuery, useUpdateStudentMutation } from "../../../app/services/StudentService"
import useAuthentication from "../../../hooks/useAuthentication";
import { useState } from "react";
import PlanData, { type PlanDataProps } from "../forms/planDataForm/PlanData";
import { useLocation } from "react-router";
import type { UpdateStudentRequest } from "../../../app/types/requests/UpdateStudentRequest.type";

interface EditStudentProps {
    numberOfStep: number;
}

function EditStudent({ numberOfStep }: EditStudentProps) {

    const { userId } = useAuthentication();

    const [studentData, setStudentData] = useState<StudentDataProps | undefined>(undefined);

    const [paymentData, setPaymentData] = useState<PaymentDataProps | undefined>(undefined);

    const [planData, setPlanData] = useState<PlanDataProps | undefined>(undefined);


    const location = useLocation();

    const { studentId } = location.state || {};

    const { data: studentSaveData } = useGetStudentByIdQuery(studentId);

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

    const handlePlanData = (data: PlanDataProps) => {
        setPlanData(data);
        const updateData: UpdateStudentRequest = {
            studentId: studentId!,
            userId: userId!,
            ...studentSaveData,
            ...planData,
        }
        updateStudent(updateData);
    }

    const forms = {
        form1: <StudentData onSubmit={handleStudentData} data={studentData} />,
        form2: <PaymentData onSubmit={handlePaymentData} data={paymentData} />,
        form3: <PlanData onSubmit={handlePlanData} data={planData} />,
    };
};
export default EditStudent;