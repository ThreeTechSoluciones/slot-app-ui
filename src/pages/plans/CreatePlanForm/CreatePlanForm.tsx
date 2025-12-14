import { forwardRef, useImperativeHandle, useState } from "react";
import {
  FormStyle,
  InputContainer,
  LabelStyle,
  InputWrapper,
  InputStyle,
  NumberInputContainer,
  SpinButton,
} from "./CreatePlanForm.styles";
import type { CreatePlanRequest } from "../../../app/types/requests/PlansRequest/CreatePlansRequest.type";
import useAuthentication from "../../../hooks/useAuthentication";
import { toast } from "react-hot-toast";
import AddIcon from "../../../assets/add-icon.svg";
import LessIcon from "../../../assets/less-icon.svg";
import { createPlanSchema } from "./CreatePlanForm.scheme";

export interface CreatePlanFormProps {
  onSubmit?: (data: CreatePlanRequest) => void;
}

const CreatePlanForm = forwardRef((props: CreatePlanFormProps, ref) => {
  const { onSubmit } = props;

  const [name, setName] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [price, setPrice] = useState("");
  const { userId } = useAuthentication();

  useImperativeHandle(ref, () => ({
    submit: () =>
      new Promise<boolean>(async (resolve) => {
        try {
          const data: CreatePlanRequest = {
            name,
            numberOfDays: Number(numberOfDays),
            amount: Number(price),
            startDate: new Date().toISOString().split("T")[0],
            userId: userId ?? "",
          };
          await createPlanSchema.validate(data);
          onSubmit?.(data);
          resolve(true);
        } catch (err: any) {
          toast.error(err.message);
          resolve(false);
        }
      }),
  }));

  return (
    <FormStyle>
      <InputContainer>
        <LabelStyle>Nombre del plan*</LabelStyle>
        <InputWrapper>
          <InputStyle
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Pase Libre"
          />
        </InputWrapper>
      </InputContainer>

      <InputContainer>
        <LabelStyle>Cantidad de días por semana*</LabelStyle>
        <NumberInputContainer>
          <InputWrapper>
            <InputStyle
              type="number"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
            />
          </InputWrapper>

          <SpinButton
            type="button"
            style={{ right: "72px" }}
            onClick={() =>
              setNumberOfDays(Math.max(1, Number(numberOfDays) - 1).toString())
            }
          >
            <img src={LessIcon} />
          </SpinButton>
          <SpinButton
            type="button"
            style={{ right: "24px" }}
            onClick={() =>
              setNumberOfDays(Math.min(7, Number(numberOfDays) + 1).toString())
            }
          >
            <img src={AddIcon} />
          </SpinButton>
        </NumberInputContainer>
      </InputContainer>

      <InputContainer>
        <LabelStyle>Precio*</LabelStyle>
        <InputWrapper>
          <InputStyle
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </InputWrapper>
      </InputContainer>
    </FormStyle>
  );
});

CreatePlanForm.displayName = "CreatePlanForm";

export default CreatePlanForm;
