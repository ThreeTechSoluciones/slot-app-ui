import './OnlyNumberInput.styles';
import { NumberInput } from './OnlyNumberInput.styles';
interface OnlyNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  autoFocus?: boolean;
}

const OnlyNumberInput: React.FC<OnlyNumberInputProps> = ({ register, autoFocus, ...props }) => {
  return (
    <NumberInput
      {...register}
      type="number"
      autoFocus={autoFocus}
      onKeyDown={(e) => {
        if (e.key === '.' || e.key === ',' || e.key === '-' || e.key === '+') {
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
};

export default OnlyNumberInput;
