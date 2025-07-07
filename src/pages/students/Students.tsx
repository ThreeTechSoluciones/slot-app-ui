import "./Students.css";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentsScheme } from "../students/students.scheme";
import { MOCKED_PAYMENT_TYPES } from "../../mocks/paymentTypes";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "../../assets/error-icon.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

type FormData = {
  name: string;
  lastname: string;
  nroTelefono: string;
  fechaNacimiento: Date | null;
  tipoPago: string;
  cantidadDias: number;
  diaPago: string;
  diasExtra: string;
  fechaIngreso: Date | null;
};
function Students() {
  const navigate = useNavigate();
  const resolver = yupResolver(studentsScheme) as Resolver<FormData>;

  const onSubmit = (data: any) => {
    console.log("Formulario enviado con datos:", data);
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      name: "",
      lastname: "",
      nroTelefono: "",
      fechaNacimiento: null,
      tipoPago: "",
      diaPago: "",
      diasExtra: "",
      fechaIngreso: null,
    },
  });
  const tipoPagoSeleccionado = watch("tipoPago");
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="column1">
          <input {...register("name")} placeholder="Nombre" />
          {errors.name && (
            <div className="error-container">
              <img src={ErrorIcon} alt="Error" />
              <p className="error-message">{errors.name.message}</p>
            </div>
          )}

          <input {...register("lastname")} placeholder="Apellido" />
          {errors.lastname && (
            <div className="error-container">
              <img src={ErrorIcon} alt="Error" />
              <p className="error-message">{errors.lastname.message}</p>
            </div>
          )}

          <input
            {...register("nroTelefono")}
            type="tel"
            placeholder="Nro Teléfono"
          />
          {errors.nroTelefono && (
            <div className="error-container">
              <img src={ErrorIcon} alt="Error" />
              <p className="error-message">{errors.nroTelefono.message}</p>
            </div>
          )}

          <Controller
            name="fechaNacimiento"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Fecha Nacimiento"
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
          {errors.fechaNacimiento && (
            <div className="error-container">
              <img src={ErrorIcon} alt="Error" />
              <p className="error-message">{errors.fechaNacimiento.message}</p>
            </div>
          )}
          <input type="text" placeholder="Patologías/Enfermedades" />
        </div>

        <div className="column2">
          <div>
            <Controller
              name="fechaIngreso"
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
            {errors.fechaIngreso && (
              <div className="error-container">
                <img src={ErrorIcon} alt="Error" />
                <p className="error-message">{errors.fechaIngreso.message}</p>
              </div>
            )}
          </div>

          <select className="tipoPago" {...register("tipoPago")}>
            <option value="" disabled selected hidden>
              Tipo de Pago
            </option>
            {MOCKED_PAYMENT_TYPES.map((tipopago) => (
              <option key={tipopago.id} value={tipopago.name}>
                {tipopago.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            {...register("cantidadDias")}
            placeholder="Días a la Semana"
          />
          {errors.cantidadDias && (
            <div className="error-container">
              <img src={ErrorIcon} alt="Error" />
              <p>{errors.cantidadDias.message}</p>
            </div>
          )}
          <input
            type="text"
            placeholder="Día de Pago"
            disabled={tipoPagoSeleccionado !== "Día específico"}
          />
          {errors.diaPago && (
            <div className="error-container">
              <img src={ErrorIcon} alt="Error" />
              <p>{errors.diaPago.message}</p>
            </div>
          )}
          <input
            type="text"
            placeholder="Días Extras"
            disabled={tipoPagoSeleccionado !== "Del 1 al 10"}
          />
          {errors.diasExtra && (
            <div className="error-container">
              <img src={ErrorIcon} alt="Error" />
              <p>{errors.diasExtra.message}</p>
            </div>
          )}
        </div>
      </div>
      <div className="button-group">
        <button
          className="form-button cancelButton"
          onClick={() => navigate("/home")}
        >
          {" "}
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
