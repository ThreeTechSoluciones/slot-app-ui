import { MainContainer, Circle, Title, Img } from "./Step.styles"
import CheckIcon from "../../assets/check.svg"
import Arrow from "../../assets/arrow2.png"

interface StepProps {
    numberOfStep: number;
    title: string;
    currentStep: number;
}

function Step({ numberOfStep, title, currentStep }: StepProps) {

    const isBackStep = numberOfStep < currentStep;

    const isCurrentStep = numberOfStep == currentStep

    return (
        <MainContainer>
            <Circle
                $isBackStep={isBackStep}
                $isCurrentStep={isCurrentStep}
            >
                {isCurrentStep && <Img src={Arrow} />}
                {isBackStep ? <img src={CheckIcon}></img> : numberOfStep}
            </Circle>
            <Title>{title}</Title>
        </MainContainer>
    )
}
export default Step;