import { InputWithIconWrapper, InputIcon, Input } from "./SpinInput.styles"
import AddIcon from "../../assets/add-icon.svg"
import LessIcon from "../../assets/less-icon.svg";

export interface SpinInputProps {
    value: number | undefined;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    placeholder?: string;
    disabled?: boolean;
}

export const SpinInput = ({
    value,
    onChange,
    min = 1,
    max,
    placeholder,
    disabled = false,
}: SpinInputProps) => {
    const handleDecrement = () => {
        const current = value || 0;
        if (current > min) {
            onChange(current - 1);
        }
    };

    const handleIncrement = () => {
        const current = value || 0;
        if (max === undefined || current < max) {
            onChange(current + 1);
        }
    };

    return (
        <InputWithIconWrapper>
            <Input
                type="number"
                value={value || ""}
                onChange={(e) => onChange(Number(e.target.value))}
                placeholder={placeholder}
                disabled={disabled}
            />
            <InputIcon
                src={LessIcon}
                width={20}
                height={20}
                alt="Decrease"
                onClick={handleDecrement}
                $position="left"
                disabled={disabled}
            />
            <InputIcon
                src={AddIcon}
                width={20}
                height={20}
                alt="Increase"
                onClick={handleIncrement}
                $position="right"
                disabled={disabled}
            />
        </InputWithIconWrapper>
    );
};

export default SpinInput;
