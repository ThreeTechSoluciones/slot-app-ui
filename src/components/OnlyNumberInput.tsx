interface OnlyNumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
}

const OnlyNumberInput: React.FC<OnlyNumberInputProps> = ({
  register,
  ...props
}) => {
  return (
    <input
      {...register}
      type="number"
      onKeyDown={(e) => {
        if (e.key === "." || e.key === "," || e.key === "-" || e.key === "+") {
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
};

export default OnlyNumberInput;
