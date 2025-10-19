import LogoCeci from "../../assets/logoCeci.png";
import OpenEyeIcon from "../../assets/openEye-icon.png";
import ClosedEyeIcon from "../../assets/closeEye-icon.png";
import UserIcon from "../../assets/userIcon.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginScheme } from "./login.scheme";
import { useSigninMutation } from "../../app/services/AuthService";
import { encryptToBase64 } from "../../utils/Base64Utils";
import { useNavigate } from "react-router";
import {
  MainContainer,
  Title,
  Logo,
  Form,
  Label,
  InputContainer,
  Input,
  Button,
  Img,
} from "./Login.styles";
import { useState } from "react";
import toast from "react-hot-toast";
import { ErrorMessage } from "../../components/errors/ErrorMessage";

function Login() {
  const [signin] = useSigninMutation({ fixedCacheKey: "shared-auth" });

  const [signin] = useSigninMutation({ fixedCacheKey: "shared-auth" });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginScheme),
  });

  const onSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    signin(encryptToBase64(`${username}:${password}`))
      .unwrap()
      .then(() => {
        navigate("/home");
        toast.success(
          `¡Bienvenido/a ${username}, has iniciado sesión con éxito!`
        );
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const changePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <MainContainer>
      <Title>¡BIENVENIDO DE NUEVO!</Title>
      <Logo>
        <img src={LogoCeci} alt="Logo" />
      </Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Usuario*</Label>
        <InputContainer>
          <Input placeholder="Usuario" {...register("username")}></Input>
          <Img src={UserIcon} width={"24"} height={"24"}></Img>
        </InputContainer>
        <ErrorMessage error={errors.username} />
        <Label>Contraseña*</Label>
        <InputContainer>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password")}
          ></Input>
          {showPassword ? (
            <Img
              $isInteractive={true}
              onClick={changePasswordVisibility}
              src={OpenEyeIcon}
              width={"24"}
              height={"24"}
            />
          ) : (
            <Img
              $isInteractive={true}
              onClick={changePasswordVisibility}
              src={ClosedEyeIcon}
              width={"24"}
              height={"24"}
            />
          )}
        </InputContainer>
        <ErrorMessage error={errors.password} />
        <Button type="submit">Aceptar</Button>
      </Form>
    </MainContainer>
  );
}
export default Login;
