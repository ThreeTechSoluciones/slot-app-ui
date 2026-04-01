import { useState } from 'react';
import * as s from './StudentRecover.styles';
import { GenericModal } from '../../../components/generic_modal/GenericModal';
import CheckIcon from '../../../assets/check.svg';
import { useRecoverStudentSlotMutation } from '../../../app/services/StudentService';
import { useGetUserStudentsQuery } from '../../../app/services/UserService';
import useAuthentication from '../../../hooks/useAuthentication';
import toast from 'react-hot-toast';
import type { StudentResponse } from '../../../app/types/responses/StudentResponse.type';

interface StudentRecoverProps {
  onCancel: () => void;
  selectedSlotId: string;
  availableCapacity: number;
}

export const StudentRecover = ({
  onCancel,
  selectedSlotId,
  availableCapacity,
}: StudentRecoverProps) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const { userId } = useAuthentication();
  const [recoverSlot] = useRecoverStudentSlotMutation();
  const { data: studentsResponse } = useGetUserStudentsQuery({
    userId: userId!,
    filterByAbsences: true,
    page: 0,
    size: 100,
  });
  const students = studentsResponse?.content ?? [];
  const handleConfirmRecover = async (studentId: string, specificSlotId: string) => {
    return recoverSlot({ studentId, specificSlotId })
      .unwrap()
      .then(() => {
        toast.success(`Recuperación registrada`);
        onCancel();
      });
  };
  const Student = (student: StudentResponse) => {
    const isSelected = selectedStudentId === student.id;
    return (
      <s.RecoverItem
        key={student.id}
        $selected={isSelected}
        onClick={() =>
          setSelectedStudentId((prevId) => (prevId === student.id ? null : student.id))
        }
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
  };
  return (
    <GenericModal
      isOpen={true}
      title="AGREGAR ALUMNO"
      isConfirmModal
      onCancel={onCancel}
      onConfirm={() =>
        selectedStudentId
          ? handleConfirmRecover(selectedStudentId, selectedSlotId)
          : toast.error('Por favor, seleccione un alumno.')
      }
      confirmText="Registrar"
      cancelText="Cancelar"
      width="480px"
      height="auto"
    >
      <s.RecoverContainer>
        <s.RecoverSubtitle>Capacidad disponible: {availableCapacity}</s.RecoverSubtitle>

        <s.RecoverList>
          {students.length > 0 ? (
            students.map((student) => {
              return <Student key={student.id} {...student} />;
            })
          ) : (
            <p style={{ textAlign: 'center', padding: '20px' }}>
              No hay alumnos con recuperaciones pendientes.
            </p>
          )}
        </s.RecoverList>
      </s.RecoverContainer>
    </GenericModal>
  );
};
