
import * as s from "./Slot.styles"
import type { SpecificSlotResponse, Student } from "../../../app/types/responses/CalendarResponse.type";
import FilterSearch from "../../../components/filter_search/FilterSearch";
import { useState } from "react";
import PlusIcon from "../../../assets/plus-icon.svg";
import type { CalendarAction } from "../CalendarViewPage";
import UserIcon from "../../../assets/white-user-icon.svg";
import { StatesTranslation } from "../../../utils/StatesTranslation";
import CheckIcon from "../../../assets/check.svg";
import ProgressIcon from "../../../assets/progress-icon.svg";
import { useGetSpecificSlotStudentsQuery } from "../../../app/services/SpecificSlotService";
import { skipToken } from '@reduxjs/toolkit/query'

interface SlotParams {
    slot: SpecificSlotResponse | null;
    rowIndex: number;
    columnsCount: number;
    setSlotAction: React.Dispatch<React.SetStateAction<CalendarAction | null>>
}

const STATUS_ICONS: { [key: string]: string } = {
    FINALIZED: CheckIcon,
    IN_PROGRESS: ProgressIcon,
};

const ActionsSkeleton = ({
    availableCapacity,
    filter,
    setFilter,
    onRecover,
}: {
    specificSlotId: string;
    availableCapacity: number;
    filter: string;
    setFilter: (value: string) => void;
    onRecover: () => void;
}) => {
    const isFull = availableCapacity <= 0;
    return (
        <s.ActionsContainer>
            <s.SearchFilterContainer>
                <FilterSearch
                    value={filter}
                    onChange={setFilter}
                    placeholder="Buscar"
                />
            </s.SearchFilterContainer>
            <s.TooltipContainer
                $disabled={isFull}
                onClick={() => !isFull && onRecover()}
            >
                <img src={PlusIcon} alt="Añadir alumno" />
                <s.Tooltip>{isFull ? "Cupo lleno" : "Añadir alumno"}</s.Tooltip>
            </s.TooltipContainer>
            <s.Action></s.Action>
        </s.ActionsContainer>
    );
};

const SlotInfoSkeleton = (slot: SpecificSlotResponse) => {
    return (
        <s.SlotInfoContainer>
            <s.SlotCapacity $isFull={slot.capacity === slot.maxCapacity}>
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
    slot: SpecificSlotResponse | null;
    rowIndex: number;
    columnsCount: number;
    setSlotAction: React.Dispatch<React.SetStateAction<CalendarAction | null>>;
}

function Slot(props: SlotParams) {

    const { slot, rowIndex, columnsCount, setSlotAction } = props;

    const [filter, setFilter] = useState<string>("");

    const { data } = useGetSpecificSlotStudentsQuery(
        slot?.id ? { specificSlotId: slot.id, filter: filter } : skipToken
    );

    const handleAbsenceSlot = (student: Student, specificSlotId: string) => {
        setSlotAction({
            type: "ABSENCE",
            studentId: student.id,
            studentName: student.fullName,
            specificSlotId,
        });
    };

    const handleRecoverSlot = (specificSlotId: string) => {
        setSlotAction({
            type: "RECOVER",
            specificSlotId,
        });
    };

    const slotAvailability = slot ? slot.maxCapacity - slot.capacity : 0;

    const rawStudents = filter == "" ? slot?.students : data;

    const students = Array.isArray(rawStudents) ? rawStudents : [rawStudents];

    return (
        <s.SpecificSlot $isNull={!slot} key={rowIndex} $columnsCount={columnsCount}>
            {slot && (
                <>
                    <ActionsSkeleton
                        specificSlotId={slot.id}
                        availableCapacity={slotAvailability}
                        filter={filter}
                        setFilter={setFilter}
                        onRecover={() => handleRecoverSlot(slot.id)}
                    />
                    <SlotInfoSkeleton {...slot} />
                    <s.SlotStudentsContainer>
                        {students?.map((student) => {
                            const isAbsent = student?.status === "ABSENCE";
                            return (
                                <s.StudentName
                                    key={student?.id}
                                    title={student?.fullName}
                                    onClick={() =>
                                        student && handleAbsenceSlot(student, slot.id)
                                    }
                                >
                                    {isAbsent && <s.AbsenceBadge>A</s.AbsenceBadge>}
                                    <s.StudentText $isAbsent={isAbsent}>
                                        {student?.fullName}
                                    </s.StudentText>
                                </s.StudentName>
                            );
                        })}
                    </s.SlotStudentsContainer>
                </>
            )}
        </s.SpecificSlot>
    );
}

export default Slot;

