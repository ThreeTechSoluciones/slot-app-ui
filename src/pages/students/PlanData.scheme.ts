import * as yup from "yup";

export const planDataScheme = yup.object().shape({
      planId:yup
        .string().required("Debe seleccionar un plan"),
});