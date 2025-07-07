import * as yup from "yup";

export const studentsScheme = yup
  .object({
    name: yup.string().required("Debe ingresar el nombre"),
    lastname: yup.string().required("Debe ingresar el apellido"),
    tipoPago: yup.string().required("Debe seleccionar un tipo de pago"),
    diaPago: yup.string().when("tipoPago", {
      is: (val: string) => val === "Día específico",
      then: (schema) => schema.required("Debe ingresar el día de pago"),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
  .required();
