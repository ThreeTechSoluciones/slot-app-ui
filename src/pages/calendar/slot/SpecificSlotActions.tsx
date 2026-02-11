import * as s from "./SpecificSlotActions.styles";
import type {
  SpecificSlotResponse,
  Student,
} from "../../../app/types/responses/CalendarResponse.type";
import FilterSearch from "../../../components/filter_search/FilterSearch";
import { useState } from "react";
import PlusIcon from "../../../assets/plus-icon.svg";
import UserIcon from "../../../assets/white-user-icon.svg";
import { StatesTranslation } from "../../../utils/StatesTranslation";
import CheckIcon from "../../../assets/check.svg";
import ProgressIcon from "../../../assets/progress-icon.svg";
import { useGetSpecificSlotStudentsQuery } from "../../../app/services/SpecificSlotService";
import { skipToken } from "@reduxjs/toolkit/query";
import type { CalendarAction } from "../CalendarViewPage";

const STATUS_ICONS: { [key: string]: string } = {
  FINALIZED: CheckIcon,
  IN_PROGRESS: ProgressIcon,
};

const ActionsSkeleton = ({
  filter,
  setFilter,
  onRecover,
  onCancel,
  isCanceled,
  isFull,
}: {
  specificSlotId: string;
  availableCapacity: number;
  filter: string;
  setFilter: (value: string) => void;
  onRecover: () => void;
  onCancel: () => void;
  isCanceled: boolean;
  isFull: boolean;
}) => {
  return (
    <s.ActionsContainer>
      <s.SearchFilterContainer>
        <FilterSearch
          value={filter}
          onChange={setFilter}
          placeholder="Buscar"
        />
      </s.SearchFilterContainer>
      <s.ActionGroup>
        <s.TooltipContainer
          $disabled={isFull || isCanceled}
          onClick={() => !isFull && onRecover()}
        >
          <img src={PlusIcon} alt="Añadir alumno" />
          <s.Tooltip>
            {isCanceled
              ? "Turno cancelado"
              : isFull
                ? "Cupo lleno"
                : "Añadir alumno"}
          </s.Tooltip>
        </s.TooltipContainer>
        <s.TooltipContainer
          $disabled={isCanceled}
          onClick={() => !isCanceled && onCancel()}
        >
          <s.CancelIcon src={PlusIcon} alt="Cancelar turno" />
          <s.Tooltip>
            {isCanceled ? "Turno cancelado" : "Cancelar turno"}
          </s.Tooltip>
        </s.TooltipContainer>
      </s.ActionGroup>
    </s.ActionsContainer>
  );
};

const SlotInfoSkeleton = ({
  slot,
  isFull,
}: {
  slot: SpecificSlotResponse;
  isFull: boolean;
}) => {
  return (
    <s.SlotInfoContainer>
      <s.SlotCapacity $isFull={isFull} $isCanceled={slot.status === "CANCELED"}>
        <img
          src={UserIcon}
          alt="Capacity"
          style={{
            width: 16,
            height: 16,
            marginRight: 2,
            filter: "brightness(0) invert(1)",
          }}
        />
        {slot.capacity} / {slot.maxCapacity}
      </s.SlotCapacity>
      <s.SlotStatus $status={slot.status}>
        {STATUS_ICONS[slot.status] && (
          <img
            src={STATUS_ICONS[slot.status]}
            alt="Status"
            style={{ width: 12, height: 12, marginRight: 3 }}
          />
        )}
        {StatesTranslation[slot.status]}
      </s.SlotStatus>
    </s.SlotInfoContainer>
  );
};

interface SlotParams {
  slot: SpecificSlotResponse;
  dayOfWeek: string;
  rowIndex: number;
  columnsCount: number;
  setSlotAction: React.Dispatch<React.SetStateAction<CalendarAction | null>>;
}

function Slot(props: SlotParams) {
  const { slot, dayOfWeek, rowIndex, columnsCount, setSlotAction } = props;

  const [filter, setFilter] = useState<string>("");

  const { data: filteredStudents } = useGetSpecificSlotStudentsQuery(
    slot?.id ? { specificSlotId: slot.id, filter: filter } : skipToken,
  );

  const handleAbsenceSlot = (student: Student, specificSlotId: string) => {
    setSlotAction({
      type: "ABSENCE",
      studentId: student.id,
      studentName: student.fullName,
      specificSlotId,
    });
  };

  const handleRecoverSlot = (
    specificSlotId: string,
    availableCapacity: number,
  ) => {
    setSlotAction({
      type: "RECOVER",
      specificSlotId,
      availableCapacity,
    });
  };
  const handleCancelSlot = (specificSlotId: string) => {
    if (!slot || !dayOfWeek) return;
    setSlotAction({
      type: "CANCEL",
      specificSlotId,
      dayOfWeek,
      slot: { startTime: slot.startTime, endTime: slot.endTime },
    });
  };

  const students = filter ? filteredStudents : slot.students;
  const availableCapacity = slot.maxCapacity - slot.capacity;
  const isFull = slot.capacity === slot.maxCapacity;
  return (
    <s.SpecificSlot key={rowIndex} $columnsCount={columnsCount}>
      {slot && (
        <>
          <ActionsSkeleton
            specificSlotId={slot.id}
            availableCapacity={availableCapacity}
            filter={filter}
            setFilter={setFilter}
            onRecover={() => handleRecoverSlot(slot.id, availableCapacity)}
            onCancel={() => handleCancelSlot(slot.id)}
            isCanceled={slot.status === "CANCELED"}
            isFull={isFull}
          />
          <SlotInfoSkeleton slot={slot} isFull={isFull} />
          {slot.status === "CANCELED" ? (
            <s.CanceledSlot>Turno cancelado</s.CanceledSlot>
          ) : (
            <s.SlotStudentsContainer>
              {students?.map((student) => {
                const isAbsent = student.status === "ABSENCE";
                const isRecover = student.status === "RECOVERED";
                return (
                  <s.StudentName
                    key={student?.id}
                    title={student?.fullName}
                    onClick={() =>
                      student && handleAbsenceSlot(student, slot.id)
                    }
                  >
                    {isAbsent && <s.AbsenceBadge>A</s.AbsenceBadge>}
                    {isRecover && <s.RecoverBadge>R</s.RecoverBadge>}
                    <s.StudentText $isAbsent={isAbsent} $isRecover={isRecover}>
                      {student?.fullName}
                    </s.StudentText>
                  </s.StudentName>
                );
              })}
            </s.SlotStudentsContainer>
          )}
        </>
      )}
    </s.SpecificSlot>
  );
}

export default Slot;
