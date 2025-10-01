import { formatCurrency } from "../../../../utils/Formatter";
import { SmallInput } from "./PaymentData.styles";

type CurrencyInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: number | null;
  onChange: (value: number | null) => void;
};

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const numeric = raw ? Number(raw) : null;
    onChange(numeric);
  };

  return (
    <SmallInput
      {...props}
      value={value !== null ? `$ ${new Intl.NumberFormat("es-AR").format(value)}` : ""}
      onChange={handleChange}
    />
  );
};
