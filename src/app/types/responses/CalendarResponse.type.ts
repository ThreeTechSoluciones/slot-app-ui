export interface CalendarResponse {
  dayOfWeek: string;
  numberOfDay: number;
  slots: Slots[];
}

export interface Slots {
  id: string;
  startTime: string;
  endTime: string;
  maxCapacity: string;
  capacity: number;
  students: Students[];
}

export interface Students {
  id: string;
  fullName: string;
  status: string;
}
