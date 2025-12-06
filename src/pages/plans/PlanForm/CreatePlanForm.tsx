import { forwardRef, useImperativeHandle, useState } from "react";
import { InputContainer } from "./CreatePlanForm.styles";
import type { CreatePlanRequest } from "../../../app/types/requests/PlansRequest/CreatePlansRequest.type";
import useAuthentication from "../../../hooks/useAuthentication";
import { toast } from "react-hot-toast";

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
      new Promise<boolean>((resolve) => {
        // simple validation
        if (!name || !numberOfDays || !price) {
          toast.error("Complete todos los campos");
          resolve(false);
          return;
        }

        const data: CreatePlanRequest = {
          name,
          numberOfDays: Number(numberOfDays),
          amount: Number(price),
          startDate: new Date().toISOString().split("T")[0],
          userId: userId ?? "",
        };

        onSubmit?.(data);
        resolve(true);
      }),
  }));

  return (
    <form>
      <InputContainer>
        <label>Nombre del plan*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <label>Cantidad de días por semana*</label>
        <input
          type="number"
          min={1}
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(e.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <label>Precio*</label>
        <input
          type="number"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </InputContainer>
    </form>
  );
});

CreatePlanForm.displayName = "CreatePlanForm";

export default CreatePlanForm;
