import * as yup from "yup";
import { PlanType } from "../../app/types/models/PlanType";

export const commonStudentsScheme = yup.object().shape({
  dni: yup
    .string()
    .required("Debe ingresar el DNI")
    .max(8, "DNI no puede tener más de 8 números")
    .matches(/^\d+$/, "El DNI solo puede contener números"),
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
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 15)),
      "Debe tener al menos 15 años"
    ),
  paymentType: yup.string().required("Debe seleccionar un tipo de pago"),
  classesPerWeek: yup
    .number()
    .typeError("Debe ingresar una cantidad válida")
    .required("Debe ingresar la cantidad de días")
    .min(1, "Debe ser al menos 1 día")
    .max(7, "No puede superar los 7 días"),
  admissionDate: yup.date().required("La fecha de ingreso es obligatoria"),
  paymentDay: yup
    .number()
    .nullable()
    .default(null)
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .when("paymentType", {
      is: (val: string) => val === PlanType.DIA_ESPECIFICO,
      then: (schema) =>
        schema
          .required("Debe ingresar el día de pago")
          .typeError("Debe ingresar un número válido")
          .min(1, "Como mínimo debe ser el día 1")
          .max(31, "Como máximo debe ser el día 31"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const studentsScheme = commonStudentsScheme.shape({
  extraDays: yup
    .number()
    .default(0)
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .when("paymentType", {
      is: (val: string) => val === PlanType.PRINCIPIO_MES,
      then: (schema) =>
        schema
          .required("Debe ingresar los días extras")
          .typeError("Debe ingresar un número válido")
          .min(1, "Como mínimo debe ser un día extra")
          .max(31, "Como máximo debe ser 31 días"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
