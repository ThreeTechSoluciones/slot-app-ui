import StudentData, { type StudentDataProps } from "../forms/studentDataForm/StudentData"
import PaymentData, { type PaymentDataProps } from "../forms/paymentDataForm/PaymentData"
import PlanData, { type PlanDataProps } from "../forms/planDataForm/PlanData"
import { useGetStudentByIdQuery, useUpdateStudentMutation } from "../../../app/services/StudentService"
import useAuthentication from "../../../hooks/useAuthentication";
import { useRef, type JSX } from "react";
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

    const formPlanDataRef = useRef<any>(undefined);

    const { numberOfStep } = useParams();

    const numberOfStepNum = numberOfStep ? parseInt(numberOfStep) : null;

    const state = useLocation().state;

    if (!state || !userId || !numberOfStepNum) {
        return <p>Hubo un error al cargar la página. Intente nuevamente</p>;
    }

    const { studentId } = state as { studentId: string };

    const { data: studentSaveData, isLoading, isError } = useGetStudentByIdQuery(studentId!);

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

    if (isLoading) {
        return <p>Cargando datos del estudiante...</p>;
    }

    if (isError || !studentSaveData) {
        return <p>Hubo un error al obtener la informacion del estudiante. Intente nuevamente</p>;
    }

    const handleUpdateStudentData = (data: StudentDataProps) => {
        updateStudentData({
            studentId: studentId,
            userId: userId,
            ...studentSaveData,
            ...data,
            birthday: formatDateToDash(data.birthday),
            slotIds: studentSaveData.slots.map(slot => slot.slotId)
        });
    }

    const handleUpdatePaymentData = (data: PaymentDataProps) => {
        updateStudentData({
            studentId: studentId,
            userId: userId,
            ...studentSaveData,
            ...data,
            birthday: formatDateToISO(studentSaveData.birthday),
            slotIds: studentSaveData.slots.map(slot => slot.slotId)
        });
    }

    const handleUpdatePlanData = (data: PlanDataProps) => {
        updateStudentData({
            studentId: studentId,
            userId: userId,
            ...studentSaveData,
            ...data,
            birthday: formatDateToISO(studentSaveData.birthday),
            slotIds: data.slotIds,
            planId: data.planId,
        });
    }

    const handleClick = async () => {
        const refs = [formStudentDataRef, formPaymentDataRef, formPlanDataRef];
        refs[numberOfStepNum - 1].current.submit();
    }

    const forms: Record<number, { title: string, component: JSX.Element }> = {
        1: { title: "EDITAR DATOS DEL ALUMNO", component: (<StudentData ref={formStudentDataRef} onSubmit={handleUpdateStudentData} data={showStudentData(studentSaveData)} />) },
        2: { title: "EDITAR DATOS DEL PAGO", component: (<PaymentData ref={formPaymentDataRef} onSubmit={handleUpdatePaymentData} data={studentSaveData} actionType="edit" />) },
        3: { title: "EDITAR TURNOS", component: (<PlanData ref={formPlanDataRef} onSubmit={handleUpdatePlanData} data={studentSaveData} actionType="edit" />) },
    };

    const updateStudentData = (data: UpdateStudentRequest) => {
        updateStudent(data)
            .unwrap()
            .then(() => {
                navigate(-1);
                toast.success("Los datos del estudiante han sido actualizados");
            });
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