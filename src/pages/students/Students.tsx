import "./Students.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentsScheme } from "../students/students.scheme";
import { MOCKED_PAYMENT_TYPES } from "../../mocks/paymentTypes";

function Students() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentsScheme),
  });
  const onSubmit = (data: any) => {
    console.log("Formulario enviado con datos:", data);
  };
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="column1">
          <input {...register("name")} placeholder="Nombre" />
          {errors.name && <p>{errors.name.message}</p>}

          <input {...register("lastname")} placeholder="Apellido" />
          {errors.lastname && <p>{errors.lastname.message}</p>}

          <input type="text" placeholder="Nro Teléfono" />
          <input type="text" placeholder="Fecha Nacimiento" />
          <input type="text" placeholder="Patologías/Enfermedades" />
        </div>

        <div className="column2">
          <input type="text" placeholder="Fecha de ingreso" />

          <select className="tipoPago" {...register("tipoPago")}>
            <option>Tipo de Pago</option>
            {MOCKED_PAYMENT_TYPES.map((tipopago) => (
              <option key={tipopago.id} value={tipopago.name}>
                {tipopago.name}
              </option>
            ))}
          </select>

          <input type="number" placeholder="Días a la Semana" />
          <input type="text" placeholder="Día de Pago" />
          <input type="text" placeholder="Días Extras" />
        </div>
      </div>
      <div className="button-group">
        <button className="form-button cancelButton"> Cancelar</button>
        <button className="form-button registerButton" type="submit">
          Registrar
        </button>
      </div>
    </form>
  );
}

export default Students;
