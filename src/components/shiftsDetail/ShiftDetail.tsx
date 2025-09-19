import { ShiftDetailContainer,
        Title, 
        ShiftContainer, 
        Shift, 
        Text1, 
        Text2} 
    from "./ShiftDetail.styles"
import CalenderIcon from "../../assets/CalenderIcon.png"


interface ShiftDetailProps {
    shifts: {
        day: string[];
        hour : string [];
    }
}

function ShiftDetail({shifts}: ShiftDetailProps){
    
    return(
        <ShiftDetailContainer>
            <Title>
                <img src={CalenderIcon} width={"24px"} height={"24px"}></img>Turnos asignados
            </Title>
            <ShiftContainer>
                {shifts.day.map((day, index)=>(
                    <Shift key={index}>
                        <Text1>{day}</Text1>
                        <Text2>{shifts.hour[index]} hs</Text2>
                    </Shift>
                ))}
            </ShiftContainer>
        </ShiftDetailContainer> 
    )
}

export default ShiftDetail;