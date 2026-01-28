export type Slot = {
    id: string;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    usedCapacity: number;
}

export type SlotListResponse = {
    dayOfWeek: string;
    numberOfSlots: number;
    slots: Slot[];
}

