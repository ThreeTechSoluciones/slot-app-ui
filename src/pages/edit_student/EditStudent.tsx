import { useNavigate, useLocation } from "react-router";
import { useGetStudentByIdQuery } from "../../app/services/StudentService";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { studentsScheme } from "../students/students.scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateStudentMutation } from "../../app/services/StudentService";
import useAuthentication from "../../hooks/useAuthentication";
import toast from "react-hot-toast";
import { PlanType } from "../../app/types/models/PlanType";

type FormData = yup.InferType<typeof studentsScheme>;

function parseDateFromString(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
}
function EditStudent() {
  const { studentId } = useLocation().state;
  console.log("EditStudent studentId:", studentId);
  const { data: student } = useGetStudentByIdQuery(studentId);
  const navigate = useNavigate();
  const { userId } = useAuthentication();
  const [updateStudent] = useUpdateStudentMutation();

  console.log("EditStudent studentId:", student);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(studentsScheme),
  });
  const paymentTypeSelected = watch("paymentType");

  useEffect(() => {
    if (student && student.birthday && student.admissionDate) {
      reset({
        dni: student.dni,
        name: student.name,
        lastname: student.lastName,
        phoneNumber: student.cellphoneNumber,
        birthday: parseDateFromString(student.birthday),
        admissionDate: parseDateFromString(student.admissionDate),
        paymentType: student.planType,
        classesPerWeek: student.classesPerWeek,
        extraDays: student.extraDays ?? 0,
        paymentDay: student.paymentDay,
        pathologies: student.pathologies ?? "",
      });
    }
  }, [student, reset]);

  const onSubmit = async (data: FormData) => {
    if (!userId || !student?.id) return;
    try {
      await updateStudent({
        studentId: student.id,
        body: {
          dni: data.dni,
          name: data.name,
          lastName: data.lastname,
          cellphoneNumber: data.phoneNumber,
          planType: data.paymentType,
          classesPerWeek: data.classesPerWeek,
          extraClasses: data.extraDays,
          paymentDay: data.paymentDay,
          birthday: data.birthday,
          admissionDate: data.admissionDate,
          pathologies: data.pathologies,
          userId,
        },
      }).unwrap();
      toast.success("Alumno actualizado con éxito");
      navigate("/home");
    } catch (err) {
      console.error("Error al actualizar estudiante:", err);
      toast.error("Hubo un error al actualizar");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="column1">
          <label>DNI:</label>
          <input {...register("dni")} type="number" />
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

          <label>Patologías:</label>
          <input {...register("pathologies")} type="text" />
          <ErrorMessage error={errors.pathologies} />
        </div>

        <div className="column2">
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
            {...register("paymentDay")}
            disabled={paymentTypeSelected !== "Día específico"}
          />
          <ErrorMessage error={errors.paymentDay} />

          <label>Días Extras:</label>
          <input
            type="number"
            {...register("extraDays")}
            disabled={paymentTypeSelected !== "Principio de mes"}
          />
          <ErrorMessage error={errors.extraDays} />
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
