import * as yup from "yup";


export const classDataScheme = yup.object().shape({
  paymentType: yup.string().required("Debe seleccionar un tipo de pago"),
  extraClasses: yup
    .number()
    .notRequired()
    .typeError("Solo se permiten números")
    .min(1, "Debe ser al menos 1 día")
    .max(7, "No puede superar los 7 días")
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable(),
  price:yup
    .string()
    .notRequired()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .matches(/^[0-9]+$/, "Solo se permiten números")
    ,
  paymentDay: yup
    .number()
    //poner aca la condicion para cuando no esté habilitado
    .typeError("Solo se permiten números")
    .min(1, "Se permiten pagos a partir del día 1")
    .max(28, "Se permiten pagos hasta el día 28"),
});

