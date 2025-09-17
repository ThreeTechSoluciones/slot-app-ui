import * as yup from "yup";


export const classDataScheme = yup.object().shape({
  admissionDate: 
    yup.date().required("La fecha de ingreso es obligatoria")
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    }),
  paymentType: yup.string().required("Debe seleccionar un tipo de pago"),
  extraClasses: yup
    .number()
    .typeError("Solo se permiten números")
    .min(1, "Debe ser al menos 1 día")
    .max(7, "No puede superar los 7 días")
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable(),
  price:yup
    .string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .matches(/^[0-9]+$/, "Solo se permiten números"),
  paymentDay: yup
    .number()
    .typeError("Solo se permiten números")
    .min(1, "Se permiten pagos a partir del día 1")
    .max(28, "Se permiten pagos hasta el día 28"),
  //classes:yup
  //.string()
  //.required("Debe asignar los turnos correspondientes al plan seleccionado"),
});

