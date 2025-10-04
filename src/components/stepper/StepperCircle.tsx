import {MainContainer, Circle, Title, Step ,Img} from "./StepperCircle.styles"
import CheckIcon from "../../assets/check.png"
import Arrow from "../../assets/arrow.png"

interface StepperCircleProps {
    numberOfStep: number;
    title: string;
    currentStep: number;
}

function StepperCircle ({numberOfStep, title, currentStep}: StepperCircleProps){
    
    const isBackStep= numberOfStep< currentStep;
    
    const isCurrentStep=numberOfStep==currentStep
    
    return (
        <MainContainer>
            {isCurrentStep? 
                <Img src={Arrow}></Img>:""}
                <Circle $isBackStep={isBackStep} $isCurrentStep={isCurrentStep}>
                    {isBackStep ? <img src={CheckIcon}></img> : numberOfStep}
                </Circle>
                <Title>{title}</Title>
        </MainContainer>
    )
}
export default StepperCircle;