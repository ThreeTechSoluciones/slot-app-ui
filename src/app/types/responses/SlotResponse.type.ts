export type SlotResponse = {
  id: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  usedCapacity: number;
};

export type SlotListResponse = {
  dayOfWeek: string;
  numberOfSlots: number;
  slots: SlotResponse[];
};
export type StudentSlotResponse = {
  slotId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};
