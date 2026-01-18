
export type Day = {
    dayOfWeek: string;
    numberOfDay: number;
};

export type SlotTime = {
    startTime: string;
    endTime: string;
};

export type SpecificSlotResponse = {
    id: string;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    capacity: number;
    status: string;
    students: Student[];
};

export type Student = {
    id: string;
    fullName: string;
    status: string;
};

export type CalendarResponse = {
    days: Day[];
    times: SlotTime[];
    slots: (SpecificSlotResponse | null)[][];
};
