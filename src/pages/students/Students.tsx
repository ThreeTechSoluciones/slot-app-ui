import "./Students.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentsScheme } from "../students/students.scheme";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";
import { PaymentType } from "../../app/types/responses/Enum";
import * as yup from "yup";

type FormData = yup.InferType<typeof studentsScheme>;

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
          <label>Nombre:</label>
          <input {...register("name")} />
          <ErrorMessage error={errors.name} />

          <label>Apelido:</label>
          <input {...register("lastname")} />
          <ErrorMessage error={errors.lastname} />

          <label>Número de Telefono:</label>
          <input {...register("phoneNumber")} type="tel" />
          <ErrorMessage error={errors.phoneNumber} />

          <label>Fecha de Nacimiento:</label>
          <Controller
            {...register("birthday")}
            name="birthday"
            control={control}
            render={({ field }) => (
              <DatePicker
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

          <label>Patologías/Enfermedades:</label>
          <input {...register("pathologies")} type="text" />
          <ErrorMessage error={errors.pathologies} />
        </div>

        <div className="column2">
          <label>Fecha de Ingreso:</label>
          <div>
            <Controller
              {...register("addmisionDate")}
              name="addmisionDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  onChange={(date) => field.onChange(date)}
                  selected={field.value ?? null}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            <ErrorMessage error={errors.addmisionDate} />
          </div>

          <label>Tipo de Pago:</label>
          <select className="paymentType" {...register("paymentType")}>
            {Object.values(PaymentType).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ErrorMessage error={errors.paymentType} />

          <label>Días a la Semana:</label>
          <input type="number" {...register("classesPerWeek")} />
          <ErrorMessage error={errors.classesPerWeek} />

          <label>Día de Pago:</label>
          <input
            {...register("paymentDay")}
            type="number"
            disabled={paymentTypeSelected !== "Día específico"}
          />
          <ErrorMessage error={errors.paymentDay} />

          <label>Días Extras:</label>
          <input
            {...register("extraDays")}
            type="number"
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
