import * as yup from "yup";

export const studentsScheme = yup
  .object({
    name: yup.string().required("Debe ingresar el nombre"),
    lastname: yup.string().required("Debe ingresar el apellido"),
    nroTelefono: yup
      .string()
      .min(8, "Debe tener al menos 8 caracteres")
      .max(15, "No puede superar los 15 caracteres")
      .matches(/^[+0-9\s-]+$/, "Solo se permiten números"),
    fechaNacimiento: yup
      .date()
      .nullable()
      .required("La fecha de nacimiento es obligatoria")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        "Debe tener al menos 10 años"
      ),
    tipoPago: yup.string().required("Debe seleccionar un tipo de pago"),
    cantidadDias: yup
      .number()
      .typeError("Debe ingresar un número válido")
      .required("Debe ingresar la cantidad de días")
      .min(1, "Debe ser al menos 1 día")
      .max(7, "No puede superar los 7 días"),
    fechaIngreso: yup
      .date()
      .nullable()
      .required("La fecha de ingreso es obligatoria"),
    diaPago: yup.string().when("tipoPago", {
      is: (val: string) => val === "Día específico",
      then: (schema) => schema.required("Debe ingresar el día de pago"),
      otherwise: (schema) => schema.notRequired(),
    }),
    diasExtra: yup.string().when("tipoPago", {
      is: (val: string) => val === "Del 1 al 10",
      then: (schema) => schema.required("Debe ingresar los días extras"),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
  .required();
