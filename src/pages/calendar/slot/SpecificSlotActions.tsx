import * as s from "./SpecificSlotActions.styles"
import type { SpecificSlotResponse, Student } from "../../../app/types/responses/CalendarResponse.type";
import FilterSearch from "../../../components/filter_search/FilterSearch";
import { useState } from "react";
import PlusIcon from "../../../assets/plus-icon.svg";
import UserIcon from "../../../assets/white-user-icon.svg";
import { StatesTranslation } from "../../../utils/StatesTranslation";
import CheckIcon from "../../../assets/check.svg";
import ProgressIcon from "../../../assets/progress-icon.svg";
import { useGetSpecificSlotStudentsQuery } from "../../../app/services/SpecificSlotService";
import { skipToken } from '@reduxjs/toolkit/query'

type CalendarAction =
    | {
        type: "ABSENCE";
        studentId: string;
        studentName: string;
        specificSlotId: string;
    }
    | { type: "RECOVER"; specificSlotId: string; availableCapacity: number };

interface SlotParams {
    slot: SpecificSlotResponse;
    columnsCount: number;
    setSlotAction: React.Dispatch<React.SetStateAction<CalendarAction | null>>
};

const STATUS_ICONS: { [key: string]: string } = {
    FINALIZED: CheckIcon,
    IN_PROGRESS: ProgressIcon,
};

const ActionsSkeleton = ({
    filter,
    isFull,
    setFilter,
    onRecover,
}: {
    specificSlotId: string;
    availableCapacity: number;
    filter: string;
    isFull: boolean;
    setFilter: (value: string) => void;
    onRecover: () => void;
}) => {

    return (
        <s.ActionsContainer>
            <s.SearchFilterContainer>
                <FilterSearch
                    value={filter}
                    onChange={setFilter}
                    placeholder="Buscar"
                    iconWidth={10}
                    iconHeight={14}
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

const SlotInfoSkeleton = ({
    slot,
    isFull,
}: {
    slot: SpecificSlotResponse;
    isFull: boolean;
}) => {
    return (
        <s.SlotInfoContainer>
            <s.SlotCapacity $isFull={isFull}>
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

function Slot({ slot, columnsCount, setSlotAction }: SlotParams) {

    const [filter, setFilter] = useState<string>("");

    const { data: filteredStudents } = useGetSpecificSlotStudentsQuery(
        filter ? { specificSlotId: slot.id, filter: filter } : skipToken
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

    const rawStudents = filter ? filteredStudents : slot.students;

    const students = rawStudents ? rawStudents : [rawStudents];

    const availableCapacity = slot
        ? slot.maxCapacity - slot.capacity
        : 0;

    const isFull = slot ? slot.capacity === slot.maxCapacity : true;

    return (
        <s.SpecificSlot $columnsCount={columnsCount}>
            {slot && (
                <>
                    <ActionsSkeleton
                        specificSlotId={slot.id}
                        availableCapacity={availableCapacity}
                        filter={filter}
                        isFull={isFull}
                        setFilter={setFilter}
                        onRecover={() => handleRecoverSlot(slot.id, availableCapacity)}
                    />
                    <SlotInfoSkeleton slot={slot} isFull={isFull} />
                    <s.SlotStudentsContainer>
                        {students?.map((student) => {
                            const isAbsent = student?.status === "ABSENCE";
                            const isRecover = student?.status === "RECOVERED";
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
                </>
            )}
        </s.SpecificSlot>
    );
}

export default Slot;

