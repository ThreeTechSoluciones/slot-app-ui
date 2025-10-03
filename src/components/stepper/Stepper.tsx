import StepperCircle from "./StepperCircle"
import { MainContainer } from "./Stepper.styles";

type Steps = {
    numberOfStep:number;
    title:string;
}

interface StepperProps {
    steps:Steps[];
    currentStep:number;
}

function Stepper ({steps, currentStep}:StepperProps){
     if (!steps) {
    return null;
  }
    return(
        <MainContainer>
            {steps.map((step, index)=>(
                <StepperCircle
                    key={index}
                    numberOfStep={index+1}
                    title={step.title}
                    currentStep={currentStep}
                    />
                ))}
        </MainContainer>
    )
}
export default Stepper;