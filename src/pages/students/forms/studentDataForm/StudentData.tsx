import { forwardRef, useImperativeHandle } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MainContainer,
  FormContainer,
  Input,
  Description,
  Label
}
  from "./StudentData.styles";
import { StudentDataScheme } from "./StudentData.scheme";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage } from "../../../../components/error_message/ErrorMessage";
import type { FormProp } from "../../create-student/FormProp.type";
import { Controller } from "react-hook-form";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import InputDate from '../../../../components/date/inputDate';
import CalendarIcon from '../../../../assets/CalenderIcon.png';


export interface StudentDataProps {
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  birthday: string;
  pathologies?: string | null;
}


const StudentData = forwardRef<FormProp<StudentDataProps>, FormProp<StudentDataProps>>((props, ref) => {

  const { data, onSubmit } = props;

  const DEFAULT_STUDENT_DATA = {
    name: "",
    lastName: "",
    dni: "",
    cellphoneNumber: "",
    birthday: "",
    pathologies: "",
  };
  const studentRegistrationForm = data || DEFAULT_STUDENT_DATA

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
    }
  });

  useImperativeHandle(ref, () => ({
    submit: () =>
      new Promise<boolean>((resolve) => {
        handleSubmit(
          (data) => {
            onSubmit?.({ ...data });
            resolve(true);
          },
          () => {
            resolve(false);
          }
        )();
      })
  }) as unknown as FormProp<StudentDataProps>);

  return (
    <MainContainer>
      <FormContainer>
        <div>
          <Label>Nombre</Label>
          <Input placeholder="Juan" {...register("name")}></Input>
          <ErrorMessage error={errors.name} />
        </div>
        <div>
          <Label>Apellido</Label>
          <Input placeholder="Gomez" {...register("lastName")}></Input>
          <ErrorMessage error={errors.lastName} />
        </div>
        <div>
          <Label>DNI</Label>
          <Input placeholder="56987256 (ingresar solo números, sin puntos ni espacios)" {...register("dni")} ></Input>
          <ErrorMessage error={errors.dni} />
        </div>
        <div>
          <Label>Fecha de nacimiento</Label>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <InputDate
                {...field}
                onChange={(date) => field.onChange(date)}
                value={field.value || null}
                format="dd/MM/yyyy"
                locale="es-ES"
                clearIcon={null}
                calendarIcon={<img src={CalendarIcon} alt="Calendario" style={{ width: 20, height: 20 }} />}
              />
            )}
          />

          <ErrorMessage error={errors.birthday} />
        </div>
        <div>
          <Label>Número de teléfono</Label>
          <Input placeholder="3534698523" {...register("cellphoneNumber")}></Input>
          <ErrorMessage error={errors.cellphoneNumber} />
        </div>
        <div>
          <Label>Patologías o enfermedades (opcional)</Label>
          <Description placeholder="Hernia de disco" {...register("pathologies")}></Description>
          <ErrorMessage error={errors.pathologies} />
        </div>
      </FormContainer>
    </MainContainer>
  )
});

StudentData.displayName = 'StudentDataForm';
export default StudentData;