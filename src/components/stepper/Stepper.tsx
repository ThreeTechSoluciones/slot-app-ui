import Step from "./Step"
import { MainContainer, Button, ButtonsContainer, StepperContainer, FormContainer } from "./Stepper.styles";
import { createRef, useRef, useState } from "react";
import { useNavigate } from "react-router";


type Step = {
    title: string;
    component: React.ForwardRefExoticComponent<any>;
    props?: any;
}


interface StepperProps {
    steps: Step[];
}


function Stepper({ steps }: StepperProps) {

    const [currentStep, setCurrentStep] = useState<number>(0);
    const formRefs = useRef(steps.map(() => createRef<any>()));
    const Navigate = useNavigate();
    const nextStep = async () => {
        const currentFormRef2 = formRefs.current[currentStep];
        currentFormRef2.current.submit().then((res: any) => {
            if (res) {
                setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
            }
        });
    };

    const backStep = () => {
        if (currentStep === 0) {
            Navigate("/home")
        }
        else {
            setCurrentStep((prev) => Math.max(prev - 1, 0));
        }
    };


    const maxSteps = steps.length;
    const CurrentForm = steps[currentStep].component;
    const currentFormRef = formRefs.current[currentStep];

    if (!steps) {
        return null;
    }

    return (
        <MainContainer>
            <StepperContainer>
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        numberOfStep={index + 1}
                        title={step.title}
                        currentStep={currentStep + 1}
                    />
                ))}
            </StepperContainer>
            <FormContainer>
                <CurrentForm ref={currentFormRef} {...(steps[currentStep].props || {})} />
            </FormContainer>
            <ButtonsContainer>
                <Button onClick={backStep}>{currentStep == 0 ? "Cancelar" : "Atrás"}</Button>
                <Button onClick={nextStep}>{maxSteps === currentStep ? "Registrar" : "Siguiente"}</Button>
            </ButtonsContainer>
        </MainContainer>
    )
}
export default Stepper;