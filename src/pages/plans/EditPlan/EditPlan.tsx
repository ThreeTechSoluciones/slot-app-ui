import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FormStyle,
  InfoContainer,
  InfoStyle,
  InfoValue,
  InputGroup,
  Description,
  InputStyle,
  InputWrapper,
  LabelStyle,
  RowContainer,
} from "./EditPlan.styles";
import type { UpdatePlanPriceRequest } from "../../../app/types/requests/PlansRequest/UpdatePlanPriceRequest.type";
import { formatCurrency } from "../../../utils/Formatter";
export interface EditPlanFormProps {
  planId: string;
  planName: string;
  numberOfDays: number;
  currentPrice: number;
  onSubmit?: (data: UpdatePlanPriceRequest) => void;
}
const EditPlanForm = forwardRef<any, EditPlanFormProps>(
  ({ planId, planName, numberOfDays, currentPrice, onSubmit }, ref) => {
    const [price, setPrice] = useState(currentPrice.toString());
    const [startDate, setStartDate] = useState(
      new Date().toISOString().split("T")[0]
    );

    useImperativeHandle(ref, () => ({
      submit: () =>
        new Promise<boolean>((resolve) => {
          const amount = Number(price);

          if (isNaN(amount) || amount < 0) {
            toast.error("El precio debe ser un número válido");
            resolve(false);
            return;
          }
          if (!startDate) {
            toast.error("Debe seleccionar una fecha de vigencia");
            resolve(false);
            return;
          }

          onSubmit?.({
            planId,
            amount,
            startDate: new Date().toISOString().split("T")[0],
          });

          resolve(true);
        }),
    }));

    return (
      <FormStyle>
        <InfoContainer>
          <InfoStyle>
            <LabelStyle>Nombre del plan*</LabelStyle>
            <InfoValue value={planName} />
          </InfoStyle>

          <InfoStyle>
            <LabelStyle>Cantidad de días por semana*</LabelStyle>
            <InfoValue value={numberOfDays} />
          </InfoStyle>

          <InfoStyle>
            <LabelStyle>Precio vigente</LabelStyle>
            <InfoValue value={formatCurrency(currentPrice)} />
          </InfoStyle>
        </InfoContainer>
        <InputGroup>
          <LabelStyle>Actualizar precio (opcional)</LabelStyle>

          <Description>
            Ingresá el nuevo monto y la fecha a partir de la cual será válido
          </Description>

          <RowContainer>
            <InputWrapper>
              <InputStyle
                type="number"
                min={0}
                placeholder="Nuevo precio"
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <InputStyle
                type="date"
                placeholder="Fecha de inicio"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </InputWrapper>
          </RowContainer>
        </InputGroup>
      </FormStyle>
    );
  }
);

EditPlanForm.displayName = "EditPlanForm";

export default EditPlanForm;
