import DatePicker from "react-date-picker";
import { StyledWrapper } from "./inputDate.styles"



export default function InputDate(props: React.ComponentProps<typeof DatePicker>) {
    return (
        <StyledWrapper>
            <DatePicker {...props} />
        </StyledWrapper>
    );
}