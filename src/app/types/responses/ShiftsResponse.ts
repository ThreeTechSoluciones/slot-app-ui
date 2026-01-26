export type Slots = {
  day: string;
  slots: Slot[];
};

type Slot = {
  id: string;
  hour: string;
  status: string;
};
