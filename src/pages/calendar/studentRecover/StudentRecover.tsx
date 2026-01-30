import { useMemo, useState } from "react";
import type {
  CalendarResponse,
  Student,
  SpecificSlotResponse,
} from "../../../app/types/responses/CalendarResponse.type";
import * as s from "./StudentRecover.styles";
import { GenericModal } from "../../../components/generic_modal/GenericModal";
import CheckIcon from "../../../assets/check.svg";
import { toast } from "react-hot-toast";

export const getValidAbsentStudents = (
  calendarData: CalendarResponse,
  selectedSlotId: string | null,
): Student[] => {
  const absentStudentMap = new Map<string, Student>();

  let dayOfRecovery = -1;
  calendarData.slots.forEach((row) => {
    const dayOfAbsenceIndex = row.findIndex((s) => s?.id === selectedSlotId);
    if (dayOfAbsenceIndex !== -1) dayOfRecovery = dayOfAbsenceIndex;
  });

  if (dayOfRecovery === -1) return [];

  calendarData.slots.forEach((row) => {
    row.forEach((slot, dayOfAbsenceIndex) => {
      if (!slot) return;

      slot.students.forEach((student) => {
        if (
          student.status === "ABSENCE" &&
          dayOfAbsenceIndex <= dayOfRecovery &&
          slot.id !== selectedSlotId
        ) {
          absentStudentMap.set(student.id, student);
        }
      });
    });
  });

  const targetSlot = calendarData.slots
    .flat()
    .find((s) => s?.id === selectedSlotId);
  targetSlot?.students.forEach((s) => {
    absentStudentMap.delete(s.id);
  });

  return Array.from(absentStudentMap.values());
};
interface StudentRecoverProps {
  calendarData: CalendarResponse | undefined;
  selectedSlotId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (studentId: string, specificSlotId: string) => Promise<any>;
}

export const StudentRecover = ({
  calendarData,
  selectedSlotId,
  isOpen,
  onClose,
  onConfirm,
}: StudentRecoverProps) => {
  const [tempSelectedStudentId, setTempSelectedStudentId] = useState<
    string | null
  >(null);

  const absentStudents = useMemo(
    () =>
      calendarData ? getValidAbsentStudents(calendarData, selectedSlotId) : [],
    [calendarData, selectedSlotId],
  );

  const selectedSlot = useMemo(
    () =>
      calendarData?.slots
        .flat()
        .find(
          (slot): slot is SpecificSlotResponse => slot?.id === selectedSlotId,
        ),
    [calendarData, selectedSlotId],
  );

  const handleSelectStudent = (student: Student) => {
    setTempSelectedStudentId(student.id);
  };

  const handleConfirm = () => {
    if (!tempSelectedStudentId || !selectedSlotId) {
      toast.error("Por favor, selecciona un alumno");
      return;
    }

    onConfirm(tempSelectedStudentId, selectedSlotId)
      .then(() => {
        toast.success("El alumno ha sido registrado para recuperar un turno");
        setTempSelectedStudentId(null);
        onClose();
      })
      .catch(() => {
        toast.error("Error al registrar la recuperación");
      });
  };

  if (!isOpen) return null;

  const availableCapacity = selectedSlot
    ? selectedSlot.maxCapacity - selectedSlot.capacity
    : 0;

  return (
    <GenericModal
      title="AGREGAR ALUMNO"
      isConfirmModal
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmText="Registrar"
      cancelText="Cancelar"
      width="480px"
      height="auto"
    >
      <s.RecoverContainer>
        <s.RecoverSubtitle>
          Capacidad disponible: {availableCapacity}
        </s.RecoverSubtitle>

        <s.RecoverList>
          {absentStudents.length > 0 ? (
            absentStudents.map((student) => {
              const isSelected = tempSelectedStudentId === student.id;

              return (
                <s.RecoverItem
                  key={student.id}
                  $selected={isSelected}
                  onClick={() => handleSelectStudent(student)}
                >
                  <s.RecoverItemLeft>
                    <s.RecoverCheckbox $checked={isSelected}>
                      <img src={CheckIcon} alt="check" />
                    </s.RecoverCheckbox>
                    <s.RecoverStudentName>
                      {student.fullName}
                    </s.RecoverStudentName>
                  </s.RecoverItemLeft>

                  <s.RecoverBadge>1</s.RecoverBadge>
                </s.RecoverItem>
              );
            })
          ) : (
            <p style={{ textAlign: "center", padding: "20px" }}>
              No hay alumnos con ausencias pendientes.
            </p>
          )}
        </s.RecoverList>
      </s.RecoverContainer>
    </GenericModal>
  );
};
