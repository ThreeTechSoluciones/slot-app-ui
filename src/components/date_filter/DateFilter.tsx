import CalendarIcon from "../../assets/calendar-icon.png";
import { DateFilterContainer, DatePickerWrapper } from "./DateFilter.styles";
import InputDate from "../date/inputDate";

interface DateFilterProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ value, onChange }) => {
  return (
    <DateFilterContainer>
      <DatePickerWrapper hasValue={!!value}>
        <InputDate
          onChange={(date) => {
            onChange(date instanceof Date ? date : null);
          }}
          value={value}
          format="dd/MM/yyyy"
          locale="es-ES"
          clearIcon={null}
          calendarIcon={
            <img
              src={CalendarIcon}
              alt="Calendario"
              style={{ width: 20, height: 20 }}
            />
          }
        />
      </DatePickerWrapper>
    </DateFilterContainer>
  );
};

export default DateFilter;
