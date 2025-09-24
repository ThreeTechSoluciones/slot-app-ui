import { useState } from "react";

type Shift={
    id: string;
    day: string;
    hour: string;
}

const daysOrder: Record<string, number> = {
  Lun: 1,
  Mar: 2,
  Mie: 3,
  Jue: 4,
  Vie: 5,
  Sab: 6,
  Dom: 7,
};

export function useShiftHandler() {

  const [shifts, setShifts] = useState<Shift[]>([]);

  const parseHour = (hour: string) => {
  const [h, m] = hour.split(":").map(Number);
  return h * 60 + m;
};

  const newShift = (id:string, day:string, hour:string) => { 
    setShifts((prev) => {
    const orderedShifts = [...prev, { id, day, hour }];
    return orderedShifts.sort((a, b) => {
      const dayDiff = daysOrder[a.day] - daysOrder[b.day];
      if (dayDiff !== 0) return dayDiff;
      return parseHour(a.hour) - parseHour(b.hour);
      });
    });
  };

  const removeShift = (id:string) => {
    setShifts((prev) =>
      prev.filter((s) => !(s.id === id ))
    );
  };

  return { shifts, newShift, removeShift };
}

