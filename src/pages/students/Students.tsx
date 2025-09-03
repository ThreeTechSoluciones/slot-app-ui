import "./Students.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentsScheme } from "../students/students.scheme";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { PlanType } from "../../app/types/models/PlanType";
import * as yup from "yup";
import { useCreateStudentMutation } from "../../app/services/StudentService";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect } from "react";
import toast from "react-hot-toast";
import OnlyNumberInput from "../../components/number_input/OnlyNumberInput";

type FormData = yup.InferType<typeof studentsScheme>;

function Students() {
  const navigate = useNavigate();
  const [createStudent] = useCreateStudentMutation();
  const { userId } = useAuthentication();

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(studentsScheme),
    defaultValues: {
      birthday: new Date(),
      admissionDate: new Date(),
      pathologies: null,
    },
  });

  const paymentTypeSelected = watch("paymentType");

  useEffect(() => {
    resetField("extraDays");
    resetField("paymentDay");
  }, [resetField, paymentTypeSelected]);

  const onSubmit = ({
    dni,
    name,
    lastname,
    phoneNumber,
    pathologies,
    birthday,
    paymentType,
    classesPerWeek,
    admissionDate,
    paymentDay,
    extraDays,
  }: FormData) => {
    if (!userId) return;

    createStudent({
      dni,
      name,
      lastName: lastname,
      cellphoneNumber: phoneNumber,
      planType: paymentType,
      classesPerWeek,
      extraClasses: extraDays,
      paymentDay,
      birthday,
      admissionDate,
      pathologies,
      userId,
    })
      .unwrap()
      .then(() => {
        toast.success("Estudiante registrado correctamente");
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

          <label>Apelido:</label>
          <input {...register("lastname")} />
          <ErrorMessage error={errors.lastname} />

          <label>Número de Telefono:</label>
          <input {...register("phoneNumber")} type="tel" />
          <ErrorMessage error={errors.phoneNumber} />

          <label>Fecha de Nacimiento:</label>
          <Controller
            {...register("birthday")}
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

          <label>Patologías/Enfermedades:</label>
          <input {...register("pathologies")} type="text" />
          <ErrorMessage error={errors.pathologies} />
        </div>

        <div className="column2">
          <label>Fecha de Ingreso:</label>
          <div>
            <Controller
              {...register("admissionDate")}
              name="admissionDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  onChange={(date) => field.onChange(date)}
                  selected={field.value ?? null}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            <ErrorMessage error={errors.admissionDate} />
          </div>

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
            {...register("paymentDay")}
            type="number"
            disabled={paymentTypeSelected !== "Día específico"}
          />
          <ErrorMessage error={errors.paymentDay} />

          <label>Días Extras:</label>
          <input
            {...register("extraDays")}
            type="number"
            disabled={paymentTypeSelected !== "Principio de mes"}
          />
          <ErrorMessage error={errors.extraDays} />
        </div>
      </div>
      <div className="button-group">
        <button
          className="form-button cancelButton"
          onClick={() => navigate("/home")}
        >
          Cancelar
        </button>
        <button className="form-button registerButton" type="submit">
          Registrar
        </button>
      </div>
    </form>
  );
}

export default Students;
