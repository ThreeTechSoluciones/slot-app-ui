import DatePicker from "react-date-picker";
import { StyledWrapper } from "./inputDate.styles";

interface InputDateProps extends React.ComponentProps<typeof DatePicker> {
  calendarPosition?: "birthday" | "filter";
}
export default function InputDate({
  calendarPosition = "birthday",
  ...props
}: InputDateProps) {
  return (
    <StyledWrapper $calendarPosition={calendarPosition}>
      <DatePicker {...props} />
    </StyledWrapper>
  );
}
