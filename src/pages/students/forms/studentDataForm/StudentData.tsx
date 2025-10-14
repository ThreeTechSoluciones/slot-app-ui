import { forwardRef, useImperativeHandle, useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MainContainer,
  FormContainer,
  Input,
  Description,
  InputDate,
  Label
}
  from "./StudentData.styles";
import { StudentDataScheme } from "./StudentData.scheme";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage } from "../../../../components/error_message/ErrorMessage";
import type { FormProp } from "../../create-student/FormProp.type";


export interface StudentDataProps {
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  birthday: string;
  pathologies?: string | null;
}


const StudentData = forwardRef<FormProp<StudentDataProps>, FormProp<StudentDataProps>>((props, ref) => {

  const { data, onNext } = props;

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
            onNext?.({ ...data });
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
          <Label>Nombre*</Label>
          <Input placeholder="Juan" {...register("name")}></Input>
          <ErrorMessage error={errors.name} />
        </div>
        <div>
          <Label>Apellido*</Label>
          <Input placeholder="Gomez" {...register("lastName")}></Input>
          <ErrorMessage error={errors.lastName} />
        </div>
        <div>
          <Label>DNI*</Label>
          <Input placeholder="56987256 (ingresar solo números, sin puntos ni espacios)" {...register("dni")} ></Input>
          <ErrorMessage error={errors.dni} />
        </div>
        <div>
          <Label>Fecha de nacimiento*</Label>
          <InputDate type="date" {...register("birthday")}></InputDate>
          <ErrorMessage error={errors.birthday} />
        </div>
        <div>
          <Label>Número de teléfono*</Label>
          <Input placeholder="3534698523" {...register("cellphoneNumber")}></Input>
          <ErrorMessage error={errors.cellphoneNumber} />
        </div>
        <div>
          <Label>Patologías o enfermedades</Label>
          <Description placeholder="Hernia de disco" {...register("pathologies")}></Description>
          <ErrorMessage error={errors.pathologies} />
        </div>
      </FormContainer>
    </MainContainer>
  )
});

StudentData.displayName = 'StudentDataForm';
export default StudentData;