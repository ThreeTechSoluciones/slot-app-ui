import Step from './Step';
import {
  MainContainer,
  Button,
  ButtonsContainer,
  StepperContainer,
  FormContainer,
} from './Stepper.styles';
import { createRef, useEffect, useRef, useState } from 'react';

type Step = {
  title: string;
  component: React.ForwardRefExoticComponent<any>;
  props?: any;
};

interface StepperProps {
  steps: Step[];
  onCancel: () => void;
}

function Stepper({ steps, onCancel }: StepperProps) {
  if (!steps || steps.length === 0) {
    return <div>No steps provided</div>;
  }

  const [currentStep, setCurrentStep] = useState<number>(0);

  const formRefs = useRef(steps.map(() => createRef<any>()));

  const nextStep = () => {
    const currentFormRef = formRefs.current[currentStep];
    currentFormRef.current.submit().then((res: any) => {
      if (res) {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    });
  };

  const backStep = () => {
    currentStep === 0 ? onCancel() : setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nextStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const maxSteps = steps.length;

  const CurrentForm = steps[currentStep].component;

  const currentFormRef = formRefs.current[currentStep];

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
        <Button onClick={backStep}>{currentStep == 0 ? 'Cancelar' : 'Atrás'}</Button>
        <Button onClick={nextStep}>{maxSteps === currentStep ? 'Registrar' : 'Siguiente'}</Button>
      </ButtonsContainer>
    </MainContainer>
  );
}
export default Stepper;
