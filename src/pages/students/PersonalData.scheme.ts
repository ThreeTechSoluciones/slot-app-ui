import * as yup from "yup";
import { PlanType } from "../../app/types/models/PlanType";

export const personalDataScheme = yup.object().shape({
  dni: yup
      .string()
    .required("Debe ingresar el DNI")
    .matches(/^[0-9]+$/, "Solo se permiten números, sin puntos ni espacios")
    .max(8, "DNI no puede tener más de 8 números"),
  name: yup.string().required("Debe ingresar el nombre"),
  lastname: yup.string().required("Debe ingresar el apellido"),
  phoneNumber: yup
    .string()
    .required("Debe ingresar un número de teléfono")
    .min(10, "Debe tener al menos 10 caracteres")
    .max(11, "No puede tener más de 11 caracteres")
    .matches(/^[0-9]+$/, "Solo se permiten números, sin espacios"),
  pathologies: yup.string().notRequired().default(null),
  birthday: yup
    .date()
    .required("Debe ingresar una fecha de nacimiento")
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 15)),
      "Debe tener al menos 15 años"
    ),
  
});
