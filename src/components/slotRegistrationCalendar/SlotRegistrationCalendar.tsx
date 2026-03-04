import {
  MainContainer,
  Column,
  Day,
  Hour,
  WarningContainer,
} from './SlotRegistrationCalendar.styles';
import { SUCCESS_COLOR } from '../../utils/Stylesheet';
import type { Slot } from '../slotDetail/SlotDetail';
import { DaysOfWeekTranslation } from '../../utils/DaysOfWeek';
import { SearchNotFound } from '../search_not_found/SearchNotFound';
type DayWithSlots = { day: string; slots: Slot[] };
type CalendarProps = {
  selectedSlots: { id: string }[];
  onSelectSlot: (id: string, day: string, hour: string) => void;
  onDeleteSlot: (id: string, day: string, hour: string) => void;
  listSlots: DayWithSlots[];
};

function SlotRegistrationCalendar({
  selectedSlots,
  onSelectSlot,
  onDeleteSlot,
  listSlots,
}: CalendarProps) {
  return (
    <MainContainer>
      {listSlots.length > 0 ? (
        <Slots
          listSlots={listSlots}
          selectedSlots={selectedSlots}
          onSelectSlot={onSelectSlot}
          onDeleteSlot={onDeleteSlot}
        />
      ) : (
        <WarningMessage />
      )}
    </MainContainer>
  );
}
export default SlotRegistrationCalendar;
const WarningMessage = () => (
  <WarningContainer>
    <SearchNotFound message="Aún no hay turnos registrados."></SearchNotFound>
  </WarningContainer>
);
const Slots = ({ selectedSlots, onSelectSlot, onDeleteSlot, listSlots }: CalendarProps) => {
  const maxTurnos = Math.max(...listSlots.map((day) => day.slots.length));
  return listSlots.map((day) => (
    <Column key={day.day}>
      <Day>{day.day?.substring(0, 3)}</Day>
      {Array.from({ length: maxTurnos }).map((_, idx) => {
        const slot = day.slots[idx];
        const isSelected = selectedSlots.some((s) => s.id === (slot && slot.id));
        const isAvailable = slot && slot.status === 'Available';
        return (
          <Hour
            $isAvailable={isAvailable}
            type="button"
            key={slot ? `key-${slot.id}` : `empty-${idx}`}
            onClick={() =>
              isSelected
                ? onDeleteSlot(slot.id, day.day, slot.hour)
                : onSelectSlot(slot.id, day.day, slot.hour)
            }
            disabled={!isAvailable}
            style={{ backgroundColor: isSelected ? SUCCESS_COLOR : undefined }}
          >
            {slot ? slot.hour : ''}
          </Hour>
        );
      })}
    </Column>
  ));
};
