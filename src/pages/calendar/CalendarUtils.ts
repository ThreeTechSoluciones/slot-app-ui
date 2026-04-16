import type { ReactElement } from "react";

export enum CalendarActionsType {
    ABSENCE = 'ABSENCE',
    RECOVER = 'RECOVER',
    CANCEL = 'CANCEL'
}
export type CalendarAction = 
    {
        type: CalendarActionsType.ABSENCE;
        studentId: string;
        studentName: string;
        specificSlotId: string;
    } | 
    { 
        type: CalendarActionsType.RECOVER; 
        specificSlotId: string; 
        availableCapacity: number 
    } | 
    {
      type: CalendarActionsType.CANCEL;
      specificSlotId: string;
      dayOfWeek: string;
      slot: { startTime: string; endTime: string };
    };

export type CalendarModalType = {
    content: ReactElement<any, any>; // TODO: Revisar types
    primaryButtonText: string;
    secondaryButtonText: string;
    onConfirm: () => void;
}