import * as yup from "yup";

export const planDataScheme = yup.object().shape({
      planType:yup
        .string().required("Debe seleccionar un plan"),
});