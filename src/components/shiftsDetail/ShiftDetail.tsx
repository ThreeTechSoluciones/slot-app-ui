import { ShiftDetailContainer,
        Title, 
        ShiftContainer, 
        Shift, 
        Text1, 
        Text2} 
    from "./ShiftDetail.styles"
import CalenderIcon from "../../assets/CalenderIcon.png"


type Shift={
    id: string;
    day: string;
    hour: string;
}

interface ShiftDetailProps {
    shifts: Shift[];
}

function ShiftDetail({shifts}: ShiftDetailProps){
    
    return(
        <ShiftDetailContainer>
            <Title>
                <img src={CalenderIcon} width={"24px"} height={"24px"}></img>Turnos asignados
            </Title>
            <ShiftContainer>
                {shifts.map((shift, id)=>(
                    <Shift key={shift.id}>
                        <Text1>{shift.day}</Text1>
                        <Text2>{shift.hour} hs</Text2>
                    </Shift>
                ))}
            </ShiftContainer>
        </ShiftDetailContainer> 
    )
}

export default ShiftDetail;