import { useNavigate, useLocation } from "react-router";
import { useGetStudentByIdQuery } from "../../app/services/StudentService";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateStudentMutation } from "../../app/services/StudentService";
import useAuthentication from "../../hooks/useAuthentication";
import toast from "react-hot-toast";
import { PlanType } from "../../app/types/models/PlanType";
import { parseDateFromString } from "../../utils/Formatter";
import {  personalDataScheme } from "../students/PersonalData.scheme";
import "./EditStudent.css";
import OnlyNumberInput from "../../components/number_input/OnlyNumberInput";

type FormData = yup.InferType<typeof personalDataScheme>;

function EditStudent() {
  const navigate = useNavigate();
  const { userId } = useAuthentication();
  const { studentId } = useLocation().state;
  const { data: student } = useGetStudentByIdQuery(studentId);
  const [updateStudent] = useUpdateStudentMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(commonStudentsScheme),
  });

  const paymentTypeSelected = watch("paymentType");

  useEffect(() => {
    if (paymentTypeSelected === "Principio de mes") {
      resetField("paymentDay", { defaultValue: null });
    }
  }, [paymentTypeSelected, resetField]);

  useEffect(() => {
    if (student) {
      reset({
        dni: student.dni,
        name: student.name,
        lastname: student.lastName,
        phoneNumber: student.cellphoneNumber,
        birthday: parseDateFromString(student.birthday),
        admissionDate: parseDateFromString(student.admissionDate),
        paymentType: student.planType,
        classesPerWeek: student.classesPerWeek,
        paymentDay: student.paymentDay,
        pathologies: student.pathologies ?? "",
      });
    }
  }, [student, reset]);

  const onSubmit = async (data: FormData) => {
    if (!userId || !student?.id) return;
    await updateStudent({
      studentId: student.id,
      dni: data.dni,
      name: data.name,
      lastName: data.lastname,
      cellphoneNumber: data.phoneNumber,
      planType: data.paymentType,
      classesPerWeek: data.classesPerWeek,
      paymentDay: data.paymentDay,
      birthday: data.birthday,
      admissionDate: data.admissionDate,
      pathologies: data.pathologies,
      userId,
    })
      .unwrap()
      .then(() => {
        toast.success("Alumno actualizado con éxito");
        navigate("/home");
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="column1">
          <label>DNI:</label>
          <OnlyNumberInput {...register("dni")} />
          <ErrorMessage error={errors.dni} />

          <label>Nombre:</label>
          <input {...register("name")} />
          <ErrorMessage error={errors.name} />

          <label>Apellido:</label>
          <input {...register("lastname")} />
          <ErrorMessage error={errors.lastname} />

          <label>Teléfono:</label>
          <input {...register("phoneNumber")} type="tel" />
          <ErrorMessage error={errors.phoneNumber} />

          <label>Fecha de Nacimiento:</label>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                showMonthDropdown
                maxDate={new Date()}
              />
            )}
          />
          <ErrorMessage error={errors.birthday} />
        </div>

        <div className="column2">
          <label>Patologías:</label>
          <input {...register("pathologies")} type="text" />
          <ErrorMessage error={errors.pathologies} />
          <label>Fecha de Ingreso:</label>
          <Controller
            name="admissionDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
          <ErrorMessage error={errors.admissionDate} />

          <label>Tipo de Pago:</label>
          <select className="paymentType" {...register("paymentType")}>
            {Object.values(PlanType).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ErrorMessage error={errors.paymentType} />

          <label>Días a la Semana:</label>
          <input type="number" {...register("classesPerWeek")} />
          <ErrorMessage error={errors.classesPerWeek} />

          <label>Día de Pago:</label>
          <input
            type="number"
            {...register("paymentDay", {
              setValueAs: (value) =>
                paymentTypeSelected === "Principio de mes"
                  ? null
                  : value === ""
                  ? null
                  : Number(value),
            })}
            disabled={paymentTypeSelected === "Principio de mes"}
          />
          <ErrorMessage error={errors.paymentDay} />
        </div>
      </div>

      <div className="button-group">
        <button
          className="form-button cancelButton"
          type="button"
          onClick={() => navigate("/home")}
        >
          Cancelar
        </button>
        <button className="form-button registerButton" type="submit">
          Guardar cambios
        </button>
      </div>
    </form>
  );
}

export default EditStudent;
