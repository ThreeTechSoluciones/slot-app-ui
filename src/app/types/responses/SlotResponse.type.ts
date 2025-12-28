export type SlotResponse = {
    startTime: string;
    endTime: string;
    maxCapacity: number;
    usedCapacity: number;
}

export type SlotListResponse = {
    numberOfSlots: number;
    slots: SlotResponse[];
}