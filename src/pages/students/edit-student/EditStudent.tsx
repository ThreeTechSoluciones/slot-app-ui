import StudentData, { type StudentDataProps } from "../forms/studentDataForm/StudentData"
import PaymentData, { type PaymentDataProps } from "../forms/paymentDataForm/PaymentData"
import { useGetStudentByIdQuery, useUpdateStudentMutation } from "../../../app/services/StudentService"
import useAuthentication from "../../../hooks/useAuthentication";
import { useRef, type JSX } from "react";
//import PlanData, { type PlanDataProps } from "../forms/planDataForm/PlanData";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { MainContainer, TitleContainer, Title, ButtonsContainer, Button, FormContainer } from "./EditStudent.styles";
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
    }

    const handlePaymentData = (data: PaymentDataProps) => {
        const updateData = {
            studentId: studentId!,
            userId: userId!,
            ...studentSaveData,
            ...data,
            birthday: formatDateToISO(studentSaveData.birthday),
        }
        updateStudentData(updateData);
    }

    /*  const handlePlanData = (data: PlanDataProps) => {
         const updateData: UpdateStudentRequest = {
             studentId: studentId!,
             userId: userId!,
             ...studentSaveData,
             ...data,
            birthday: formatDateToISO(studentSaveData.birthday),
         }
         updateStudentData(updateData);
     } */

    const handleClick = async () => {
        if (numberOfStepNum === null) return;
        const refs = [formStudentDataRef, formPaymentDataRef];
        refs[numberOfStepNum - 1].current.submit();
    }


    const forms: Record<number, { title: string, component: JSX.Element }> = {
        1: { title: "EDITAR DATOS DEL ALUMNO", component: (<StudentData ref={formStudentDataRef} onSubmit={handleStudentData} data={showStudentData(studentSaveData)} />) },
        2: { title: "EDITAR DATOS DEL PAGO", component: (<PaymentData ref={formPaymentDataRef} onSubmit={handlePaymentData} data={studentSaveData} actionType="edit" />) },
        /*  3: <PlanData onSubmit={handlePlanData} data={planData} />, */
    };
    if (!numberOfStepNum) {
        return <p>Paso no válido</p>;
    }

    const updateStudentData = async (data: UpdateStudentRequest) => {
        try {
            await updateStudent(data).unwrap();
            navigate(-1);
            toast.success("Los datos del estudiante han sido actualizados");
        }
        catch (error) {
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
                    ></img>{forms[numberOfStepNum]?.title}</Title>
            </TitleContainer>
            <FormContainer>
                {forms[numberOfStepNum]?.component ?? <p>Paso no válido</p>}
                <ButtonsContainer>
                    <Button onClick={() => navigate(-1)}>Cancelar</Button>
                    <Button onClick={handleClick}>Guardar cambios</Button>
                </ButtonsContainer>
            </FormContainer>
        </MainContainer>
    );
};
export default EditStudent;