import CalendarIcon from '../../assets/calendar-icon.svg';
import { DateFilterContainer, DatePickerWrapper } from './DateFilter.styles';
import InputDate from '../date/inputDate';

interface DateFilterProps {
  value: Date | null | undefined;
  onChange: (date: Date | null | undefined) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ value, onChange }) => {
  return (
    <DateFilterContainer>
      <DatePickerWrapper $hasValue={!!value}>
        <InputDate
          onChange={(date) => {
            onChange(date instanceof Date ? date : null);
          }}
          value={value}
          format="dd/MM/yyyy"
          locale="es-ES"
          clearIcon={null}
          calendarPosition="bottom"
          calendarIcon={
            <img src={CalendarIcon} alt="Calendario" style={{ width: 24, height: 24 }} />
          }
        />
      </DatePickerWrapper>
    </DateFilterContainer>
  );
};

export default DateFilter;
