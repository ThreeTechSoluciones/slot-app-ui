import * as yup from 'yup';

export const SlotScheme = yup.object().shape({
  startTime: yup
    .string()
    .required('La hora de inicio es requerida')
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'El formato debe ser HH:MM (ejemplo: 15:00)'),
});
