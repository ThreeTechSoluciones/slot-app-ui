import "./Students.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentsScheme } from "../students/students.scheme";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { PaymentType } from "../../app/types/responses/Enum";

type FormData = {
  name: string;
  lastname: string;
  phoneNumber: string;
  birthday: Date;
  paymentType: string;
  classesPerWeek: number;
  addmisionDate: Date;
  payDay: string;
  extraDays: string;
};
function Students() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(studentsScheme),
    defaultValues: {
      birthday: new Date(),
      addmisionDate: new Date(),
    },
  });
  const onSubmit = (data: FormData) => {
    console.log("Formulario enviado con datos:", data);
  };
  const paymentTypeSelected = watch("paymentType");
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="column1">
          <input {...register("name")} placeholder="Nombre" />
          <ErrorMessage error={errors.name} />

          <input {...register("lastname")} placeholder="Apellido" />
          <ErrorMessage error={errors.lastname} />

          <input
            {...register("phoneNumber")}
            type="tel"
            placeholder="Nro Teléfono"
          />
          <ErrorMessage error={errors.phoneNumber} />

          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Fecha de Nacimiento"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                showMonthDropdown
                maxDate={new Date()}
              />
            )}
          />
          <ErrorMessage error={errors.birthday} />
          <input type="text" placeholder="Patologías/Enfermedades" />
        </div>

        <div className="column2">
          <div>
            <Controller
              name="addmisionDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Fecha de ingreso"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value ?? null}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            <ErrorMessage error={errors.addmisionDate} />
          </div>

          <select className="paymentType" {...register("paymentType")}>
            <option value="" disabled hidden>
              Tipo de Pago
            </option>
            {Object.values(PaymentType).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ErrorMessage error={errors.paymentType} />
          <input
            type="number"
            {...register("classesPerWeek")}
            placeholder="Días a la Semana"
          />
          <ErrorMessage error={errors.classesPerWeek} />
          <input
            type="text"
            placeholder="Día de Pago"
            disabled={paymentTypeSelected !== "Día específico"}
          />
          <ErrorMessage error={errors.payDay} />
          <input
            type="text"
            placeholder="Días Extras"
            disabled={paymentTypeSelected !== "Del 1 al 10"}
          />
          <ErrorMessage error={errors.extraDays} />
        </div>
      </div>
      <div className="button-group">
        <button
          className="form-button cancelButton"
          onClick={() => navigate("/home")}
        >
          Cancelar
        </button>
        <button className="form-button registerButton" type="submit">
          Registrar
        </button>
      </div>
    </form>
  );
}

export default Students;
