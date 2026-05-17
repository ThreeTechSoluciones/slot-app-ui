export enum CalendarActionsType {
  ABSENCE = 'ABSENCE',
  RECOVER = 'RECOVER',
  CANCEL = 'CANCEL',
  NONE = 'NONE',
}

export type CalendarAction = {
  type: CalendarActionsType;
  specificSlotId?: string;
  studentId?: string;
  studentName?: string;
  availableCapacity?: number;
  dayOfWeek?: string;
  slot?: { startTime: string; endTime: string };
};
