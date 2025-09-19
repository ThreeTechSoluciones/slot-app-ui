import { useState } from "react";

export function useShiftHandler() {
  const [shifts, setShifts] = useState<{ day: string[]; hour: string[] }>({
    day: [],
    hour: []
  });

  const newShift = (day: string, hour: string) => {
    setShifts(prev => ({
      day: [...prev.day, day],
      hour: [...prev.hour, hour]
    }));
  };

  return { shifts, newShift};
}
