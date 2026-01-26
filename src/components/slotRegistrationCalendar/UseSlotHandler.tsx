import { useState } from "react";

type Shift = {
  id: string;
  day: string;
  hour: string;
};

const daysOrder: Record<string, number> = {
  LUN: 1,
  MAR: 2,
  MIÉ: 3,
  JUE: 4,
  VIE: 5,
  SÁB: 6,
  DOM: 7,
};

export function useSlotHandler() {
  const [slots, setSlots] = useState<Shift[]>([]);

  const parseHour = (hour: string) => {
    const [h, m] = hour.split(":").map(Number);
    return h * 60 + m;
  };

  const newSlot = (id: string, day: string, hour: string) => {
    setSlots((prev) => {
      const orderedSlots = [...prev, { id, day, hour }];
      return orderedSlots.sort((a, b) => {
        const dayDiff = daysOrder[a.day] - daysOrder[b.day];
        if (dayDiff !== 0) return dayDiff;
        return parseHour(a.hour) - parseHour(b.hour);
      });
    });
  };

  const removeSlot = (id: string) => {
    setSlots((prev) => prev.filter((s) => !(s.id === id)));
  };

  return { slots, newSlot, removeSlot };
}
