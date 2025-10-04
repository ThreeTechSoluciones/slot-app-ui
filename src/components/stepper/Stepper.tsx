import StepperCircle from "./StepperCircle"
import { MainContainer } from "./Stepper.styles";
import { createRef, useRef, useState, type JSX } from "react";
import { Button, ButtonsContainer, StepperContainer, FormContainer } from "./StepperHandler.styles";

type Step = {
    title:string;
    element: React.ForwardRefExoticComponent<any>;
}


interface StepperProps {
    steps:Step[];
}

 
function Stepper ({steps}:StepperProps){
     if (!steps) {
    return null;
  }
  const [currentStep, setCurrentStep] =useState<number>(0);
  const formRefs = useRef(steps.map(()=>createRef<any>()));
   const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const backStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1)); 
    };
    
    const maxSteps = steps.length;
    const CurrentForm = steps[currentStep].element;
    const currentFormRef = formRefs.current[currentStep];
    return(
        <MainContainer>
            <StepperContainer>
                {steps.map((step, index)=>(
                <StepperCircle
                    key={index}
                    numberOfStep={index+1}
                    title={step.title}
                    currentStep={currentStep}
                    />
                ))}
            </StepperContainer>
            <FormContainer>
                <CurrentForm ref={currentFormRef }/>
            </FormContainer>
            <ButtonsContainer>
                <Button onClick={backStep}>{currentStep==1?"Cancelar":"Atrás"}</Button>
                <Button onClick={nextStep}>{maxSteps===currentStep?"Registrar":"Siguiente"}</Button>
            </ButtonsContainer>
        </MainContainer>
    )
}
export default Stepper;