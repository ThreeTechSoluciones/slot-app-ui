import { useState } from "react";

type Shift={
    id: string;
    day: string;
    hour: string;
}

export function useShiftHandler() {

  const [shifts, setShifts] = useState<Shift[]>([]);

  const newShift = (id:string, day:string, hour:string) => {
    setShifts((prev) => [...prev, { id, day, hour }]);
  };

  const removeShift = (id:string, day:string, hour:string) => {
    setShifts((prev) =>
      prev.filter((s) => !(s.id === id ))
    );
  };

  return { shifts, newShift, removeShift };
}

