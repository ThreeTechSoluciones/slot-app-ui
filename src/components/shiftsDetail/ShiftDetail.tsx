import { ShiftDetailContainer,
        MainTitle, 
        ShiftContainer, 
        Shift, 
        Text,
        } 
    from "./ShiftDetail.styles"
import CalenderIcon from "../../assets/CalenderIcon.png"


type Shift={
    id: string;
    day: string;
    hour: string;
}

interface ShiftDetailProps {
    shifts: Shift[];
     width?: string;
}


function ShiftDetail({shifts}: ShiftDetailProps){
    return(
        <ShiftDetailContainer>
            <MainTitle>
                <img src={CalenderIcon} width={"24px"} height={"24px"}></img>Turnos asignados
            </MainTitle>
            <ShiftContainer>
            {shifts.map((shift, id)=>(
                <Shift key={shift.id}>
                    <Text isADay>{shift.day}</Text>
                    <Text>{shift.hour} hs</Text>
                </Shift>
            ))}
            </ShiftContainer>
        </ShiftDetailContainer> 
    )
}

export default ShiftDetail;