// calendar.types.ts
export type DayOfWeek =
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

export type CalendarDay = {
    dayOfWeek: DayOfWeek;
    numberOfDay: number;
};

export type TimeSlot = {
    startTime: string;
    endTime: string;
};

export type Student = {
    id: string;
    fullName: string;
    status: string;
};

export type Slot = {
    id: string;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    capacity: number;
    status: string;
    students: Student[];
};

export type CalendarResponse = {
    days: CalendarDay[];
    times: TimeSlot[];
    slots: (Slot | null)[][];
};
