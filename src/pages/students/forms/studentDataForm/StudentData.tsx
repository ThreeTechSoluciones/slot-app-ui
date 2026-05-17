import { forwardRef, useImperativeHandle } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { MainContainer, FormContainer, Input, Description, Label } from './StudentData.styles';
import { StudentDataScheme } from './StudentData.scheme';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ErrorMessage } from '../../../../components/error_message/ErrorMessage';
import { Controller } from 'react-hook-form';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import InputDate from '../../../../components/date/inputDate';
import CalendarIcon from '../../../../assets/calendar-icon.svg';
import { capitalize } from '../../../../utils/CapitalizeWords';
import { InputDateContainer } from './StudentData.styles';
import { useValidateStudentDniMutation } from '../../../../app/services/StudentService';
import type { FormRef } from '../../../../app/types/FormRef';
import type { FormProps } from '../../../../app/types/FormProp';
import dniFormatter from '../../../../components/dni/dniFormatter';

export interface StudentDataProps {
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  birthday: string;
  pathologies?: string | null;
}

const StudentData = forwardRef<FormRef, FormProps<StudentDataProps>>((props, ref) => {
  const { data, onSubmit } = props;

  const DEFAULT_STUDENT_DATA = {
    name: '',
    lastName: '',
    dni: '',
    cellphoneNumber: '',
    birthday: '',
    pathologies: '',
  };
  const studentRegistrationForm = data || DEFAULT_STUDENT_DATA;

  type FormData = yup.InferType<typeof StudentDataScheme>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(StudentDataScheme),
    defaultValues: {
      ...studentRegistrationForm,
    },
  });

  const [validateStudentDni] = useValidateStudentDniMutation();
  const { getValues } = useForm<FormData>({
    resolver: yupResolver(StudentDataScheme),
    defaultValues: {
      ...studentRegistrationForm,
    },
  });

  useImperativeHandle(ref, () => ({
    submit: () =>
      new Promise<boolean>((resolve) => {
        handleSubmit(
          (data) => {
            if (data.dni === studentRegistrationForm.dni) {
              onSubmit?.(data);
              resolve(true);
              return;
            }
            validateStudentDni({ dni: data.dni })
              .unwrap()
              .then(() => {
                const formattedData = {
                  ...data,
                  name: capitalize(data.name),
                  lastName: capitalize(data.lastName),
                };
                onSubmit?.(formattedData);
                resolve(true);
              })
              .catch((error) => {
                if (error?.status === 404) {
                  resolve(false);
                  return;
                }

                resolve(false);
              });
          },
          () => resolve(false),
        )();
      }),
    getValues,
  }));

  return (
    <MainContainer>
      <FormContainer>
        <div>
          <Label>Nombre</Label>
          <Input autoFocus placeholder="Juan" {...register('name')}></Input>
          <ErrorMessage error={errors.name} />
        </div>
        <div>
          <Label>Apellido</Label>
          <Input placeholder="Gomez" {...register('lastName')}></Input>
          <ErrorMessage error={errors.lastName} />
        </div>
        <div>
          <Label>DNI</Label>
          <Controller
            name="dni"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="56987256 (ingresar solo números, sin puntos ni espacios)"
                value={dniFormatter(field.value)}
                onChange={(e) => {
                  const cleanValue = e.target.value.replace(/\D/g, '');
                  field.onChange(cleanValue);
                }}
              ></Input>
            )}
          />
          <ErrorMessage error={errors.dni} />
        </div>
        <div>
          <Label>Fecha de nacimiento</Label>
          <InputDateContainer>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <InputDate
                  {...field}
                  onChange={(date) => field.onChange(date)}
                  value={field.value || null}
                  format="dd/MM/yyyy"
                  calendarPosition="top"
                  locale="es-ES"
                  autoFocus={true}
                  clearIcon={null}
                  calendarIcon={
                    <img src={CalendarIcon} alt="Calendario" style={{ width: 20, height: 20 }} />
                  }
                />
              )}
            />
          </InputDateContainer>
          <ErrorMessage error={errors.birthday} />
        </div>
        <div>
          <Label>Número de teléfono</Label>
          <Input placeholder="3534698523" {...register('cellphoneNumber')}></Input>
          <ErrorMessage error={errors.cellphoneNumber} />
        </div>
        <div>
          <Label>Patologías o enfermedades (opcional)</Label>
          <Description placeholder="Hernia de disco" {...register('pathologies')}></Description>
          <ErrorMessage error={errors.pathologies} />
        </div>
      </FormContainer>
    </MainContainer>
  );
});

StudentData.displayName = 'StudentDataForm';
export default StudentData;
