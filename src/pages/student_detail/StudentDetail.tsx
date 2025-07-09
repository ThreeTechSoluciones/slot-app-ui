// import { useLocation } from 'react-router';
import "./StudentDetail.css";
import { MOCKED_STUDENT } from '../../mocks/students';

const StudentDetail = () => {

  // const { studentId } = useLocation().state
  const student = MOCKED_STUDENT;

  return (
    <div className='screenContainer'>
      <div className='studentInfoContainer'>
        <div>
          <p>Alumno: {student.name} {student.lastname}</p>
          <p>Fecha nacimiento: {student.birthday}</p>
          <p>Fecha de ingreso: {student.admissionDate}</p>
        </div>
        <div>
          <p>Plan: {student.plan.planType}</p>
          <p>Dias a la semana: {student.plan.daysPerWeek}</p>
          <p>Dia de vencimiento de cuota: {student.plan.paymentDueDate}</p>
        </div>
      </div>
      <div className='paymentsContainer'>
        <table>
          <thead>
            <tr>
              <th>Pago N°</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Pagado</th>
            </tr>
          </thead>
          <tbody>
            {student.payments.map((payment) => (
              <tr>
                <th>{payment.number}</th>
                <th>{payment.date}</th>
                <th>{payment.amount}</th>
                <th>{payment.status}</th>
                <th>{payment.payed}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentDetail;