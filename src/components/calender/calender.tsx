import { calenderData } from "./calenderData"
import { Column, MainContainer } from "./calender.styles"

function Calender (){
    return(
        <MainContainer>
            {calenderData.map((day)=>(
            <Column key={day.dia}>
                <h3>{day.dia}</h3>
            </Column>
            ))}
                
        </MainContainer>
    )
}
export default Calender;