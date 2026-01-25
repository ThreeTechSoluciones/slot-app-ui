import type { StudentDetailResponse } from "../app/types/responses/StudentDetailResponse.type";
import { DaysOfWeekReverse } from "../utils/DaysOfWeek";
import {
  StudentStatusStyle,
  StudentSituationStyle,
} from "../pages/student_detail/StudentDetail.styles";
import type { Shift } from "../components/shiftsDetail/ShiftDetail";
interface InfoItem {
  title: string;
  data?: string | number | null;
  component?: React.ReactNode;
}

export const studentPersonalInfo = (
  student: StudentDetailResponse,
): InfoItem[] => [
  { title: "Nombre", data: student.name },
  { title: "Apellido", data: student.lastName },
  { title: "DNI", data: student.dni },
  { title: "Fecha de ingreso", data: student.admissionDate },
  {
    title: "Fecha de nacimiento",
    data: `${student.birthday} (${student.age} años)`,
  },
  { title: "Número de teléfono", data: student.cellphoneNumber },
];

export const studentPaymentInfo = (
  student: StudentDetailResponse,
): InfoItem[] => [
  {
    title: "Forma de pago",
    data: student.paymentPlanName,
  },
  {
    title: "Estado del alumno",
    data: student.status ? "Activo" : "Inactivo",
    component: (
      <StudentStatusStyle $status={student.status}>
        {student.status ? "Activo" : "Inactivo"}
      </StudentStatusStyle>
    ),
  },
  {
    title: "Día de pago",
    data:
      student.paymentPlanName === "Principio de mes"
        ? "1-10"
        : student.paymentDay,
  },
  {
    title: "Situación del alumno",
    data: student.situation,
    component: (
      <StudentSituationStyle $situation={student.situation}>
        {student.situation}
      </StudentSituationStyle>
    ),
  },
];

export const studentShiftInfo = (student: StudentDetailResponse): Shift[] => {
  if (!student.slots?.length) return [];

  return student.slots.map((slot) => ({
    id: slot.slotId,
    day: DaysOfWeekReverse[slot.dayOfWeek],
    hour: slot.startTime,
  }));
};
