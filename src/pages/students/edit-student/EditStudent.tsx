import StudentData, { type StudentDataProps } from "../forms/studentDataForm/StudentData"
import PaymentData, { type PaymentDataProps } from "../forms/paymentDataForm/PaymentData"
import { useGetStudentByIdQuery, useUpdateStudentMutation } from "../../../app/services/StudentService"
import useAuthentication from "../../../hooks/useAuthentication";
import { useRef, type JSX } from "react";
//import PlanData, { type PlanDataProps } from "../forms/planDataForm/PlanData";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { MainContainer, TitleContainer, Title, ButtonsContainer, Button } from "./EditStudent.styles";
import { formatDateToDash, formatDateToISO } from "../../../utils/DateFormatter";
import toast from "react-hot-toast";
import type { UpdateStudentRequest } from "../../../app/types/requests/UpdateStudentRequest.type";
import BackIcon from "../../../assets/back-icon.svg";

function EditStudent() {

    const { userId } = useAuthentication();

    const formStudentDataRef = useRef<any>(undefined);

    const formPaymentDataRef = useRef<any>(undefined);

    const { numberOfStep } = useParams();

    const { studentId } = useLocation().state;

    const numberOfStepNum = numberOfStep ? parseInt(numberOfStep) : null;

    const { data: studentSaveData } = useGetStudentByIdQuery(studentId!);

    const [updateStudent] = useUpdateStudentMutation();

    const navigate = useNavigate();

    const showStudentData = (studentSaveData: StudentDataProps) => {

        const formattedBirthday = formatDateToISO(studentSaveData.birthday);

        return {
            name: studentSaveData.name,
            lastName: studentSaveData.lastName,
            dni: studentSaveData.dni,
            cellphoneNumber: studentSaveData.cellphoneNumber,
            birthday: formattedBirthday,
            pathologies: studentSaveData.pathologies ?? undefined,
        };
    }

    if (!studentSaveData) {
        return <p>Cargando datos del estudiante...</p>;
    }

    const handleStudentData = (data: StudentDataProps) => {
        const updateData = {
            studentId: studentId!,
            userId: userId!,
            ...studentSaveData,
            ...data,
            birthday: formatDateToDash(data.birthday),

        }
        updateStudentData(updateData);
        console.log("data del estudiante guardado", updateData)
        console.log("nuevo cumple", formatDateToDash(data.birthday));
    }

    const handlePaymentData = (data: PaymentDataProps) => {
        const updateData = {
            studentId: studentId!,
            userId: userId!,
            ...studentSaveData,
            ...data,
        }
        updateStudentData(updateData);
    }

    /*  const handlePlanData = (data: PlanDataProps) => {
         setPlanData(data);
         const updateData: UpdateStudentRequest = {
             studentId: studentId!,
             userId: userId!,
             ...studentSaveData,
             ...planData,
         }
         updateStudentData(updateData);
     } */

    const handleClick = async () => {
        if (numberOfStepNum === 1) {
            formStudentDataRef.current.submit();
        }
        if (numberOfStepNum === 2) {
            formPaymentDataRef.current.submit();
        }

    }

    const forms: Record<number, JSX.Element> = {
        1: <StudentData ref={formStudentDataRef} onSubmit={handleStudentData} data={showStudentData(studentSaveData)} />,
        2: <PaymentData ref={formPaymentDataRef} onSubmit={handlePaymentData} data={studentSaveData} />,
        /*  3: <PlanData onSubmit={handlePlanData} data={planData} />, */
    };
    if (!numberOfStepNum) {
        return <p>Paso no válido</p>;
    }

    const updateStudentData = async (data: UpdateStudentRequest) => {
        try {
            const result = await updateStudent(data).unwrap();
            toast.success("Los datos del estudiante han sido actualizados");
        }
        catch (error) {
            console.log('error', error)
        }


    }

    return (
        <MainContainer>
            <TitleContainer>
                <Title>
                    <img
                        src={BackIcon}
                        alt="back-icon"
                        onClick={() => navigate(-1)}
                        style={{ cursor: "pointer" }}
                    ></img>EDITAR DATOS DEL ALUMNO</Title>
            </TitleContainer>
            {forms[numberOfStepNum] ?? <p>Paso no válido</p>}
            <ButtonsContainer>
                <Button>Cancelar</Button>
                <Button onClick={handleClick}>Guardar cambios</Button>
            </ButtonsContainer>
        </MainContainer>
    );
};
export default EditStudent;