import { useState, type JSX } from "react";
import PaymentData from "../../pages/students/forms/paymentDataForm/PaymentData";
import PlanData from "../../pages/students/forms/planDataForm/PlanData";
import StudentData from "../../pages/students/forms/studentDataForm/StudentData";
import Stepper from "./Stepper";
import { MainContainer, Title, StepperContainer, ButtonsContainer, Button } from "./StepperHandler.styles";


function StepperHandler() {

    const steps = [
  { numberOfStep: 1, title: "Datos personales" },
  { numberOfStep: 2, title: "Datos del pago" },
  { numberOfStep: 3, title: "Datos del turno" },
];
  
    const [step, setStep] = useState<number>(1);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const backStep = () => {
    setStep((prev) => Math.max(prev - 1, 1)); 
  };

  const maxSteps = steps.length;



    const FormComponentMap : Map <number, JSX.Element> = new Map([
          [1, <StudentData/>],
          [2, <PaymentData />],
          [3, <PlanData />]
         ])
    return (
        <MainContainer>
          
                <Title>REGISTRAR NUEVO ALUMNO</Title>
         
            <StepperContainer>
            <Stepper steps={steps} currentStep={step} />
           { FormComponentMap.get(step) }  
           <ButtonsContainer>
            <Button onClick={backStep}>{step==1?"Cancelar":"Atrás"}</Button>
            <Button onClick={nextStep}>{maxSteps===step?"Registrar":"Siguiente"}</Button>
           </ButtonsContainer>
            </StepperContainer>
        </MainContainer>
    )
}
export default StepperHandler;