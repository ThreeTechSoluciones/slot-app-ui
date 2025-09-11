import "./Students.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentsScheme } from "./students.scheme";
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

function StudentRegister() {
    return(
        <p>hola</p>

    )
}
 

export default StudentRegister;
