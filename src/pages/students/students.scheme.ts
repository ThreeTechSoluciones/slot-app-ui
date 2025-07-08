import * as yup from "yup";
import { PaymentType } from "../../app/types/responses/Enum";

export const studentsScheme = yup
  .object({
    name: yup.string().required("Debe ingresar el nombre"),
    lastname: yup.string().required("Debe ingresar el apellido"),
    phoneNumber: yup
      .string()
      .required("Debe ingresar un número de teléfono")
      .min(8, "Debe tener al menos 8 caracteres")
      .max(15, "No puede superar los 15 caracteres")
      .matches(/^[+0-9\s-]+$/, "Solo se permiten números"),
    birthday: yup
      .date()
      .required("Debe ingresar una fecha de nacimiento")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        "Debe tener al menos 10 años"
      ),
    paymentType: yup.string().required("Debe seleccionar un tipo de pago"),
    classesPerWeek: yup
      .number()
      .typeError("Debe ingresar un número válido")
      .required("Debe ingresar la cantidad de días")
      .min(1, "Debe ser al menos 1 día")
      .max(7, "No puede superar los 7 días"),
    addmisionDate: yup.date().required("La fecha de ingreso es obligatoria"),
    payDay: yup
      .string()
      .when("paymentType", {
        is: (val: string) => val === PaymentType.DIA_ESPECIFICO,
        then: (schema) => schema.required("Debe ingresar el día de pago"),
        otherwise: (schema) => schema.notRequired(),
      })
      .optional(),
    extraDays: yup
      .string()
      .when("paymentType", {
        is: (val: string) => val === PaymentType.PRINCIPIO_MES,
        then: (schema) => schema.required("Debe ingresar los días extras"),
        otherwise: (schema) => schema.notRequired(),
      })
      .optional(),
  })
  .required();
