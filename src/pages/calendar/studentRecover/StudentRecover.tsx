import { useState } from "react";
import * as s from "./StudentRecover.styles";
import { GenericModal } from "../../../components/generic_modal/GenericModal";
import CheckIcon from "../../../assets/check.svg";
import { toast } from "react-hot-toast";
import type { StudentResponse } from "../../../app/types/responses/StudentResponse.type";

interface StudentRecoverProps {
  students: StudentResponse[];
  selectedSlotId: string | null;
  isOpen: boolean;
  availableCapacity: number;
  onClose: () => void;
  onConfirm: (studentId: string, specificSlotId: string) => Promise<any>;
}

export const StudentRecover = ({
  students,
  selectedSlotId,
  isOpen,
  availableCapacity,
  onClose,
  onConfirm,
}: StudentRecoverProps) => {
  const [tempSelectedStudentId, setTempSelectedStudentId] = useState<
    string | null
  >(null);

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
          {students.length > 0 ? (
            students.map((student) => {
              const isSelected = tempSelectedStudentId === student.id;
              return (
                <s.RecoverItem
                  key={student.id}
                  $selected={isSelected}
                  onClick={() => setTempSelectedStudentId(student.id)}
                >
                  <s.RecoverItemLeft>
                    <s.RecoverCheckbox $checked={isSelected}>
                      <img src={CheckIcon} alt="check" />
                    </s.RecoverCheckbox>
                    <s.RecoverStudentName>
                      {student.name} {student.lastname}
                    </s.RecoverStudentName>
                  </s.RecoverItemLeft>

                  <s.RecoverBadge>{student.daysToRecover}</s.RecoverBadge>
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
