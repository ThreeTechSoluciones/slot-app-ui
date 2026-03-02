import toast from 'react-hot-toast';
import Button from '../../components/button/Button';
import PaymentData from '../students/forms/paymentDataForm/PaymentData';
import PlanData from '../students/forms/planDataForm/PlanData';
import * as s from './ActivateStudent.styles';
import {
  useActivateStudentMutation,
  useGetStudentByIdQuery,
} from '../../app/services/StudentService';
import { useLocation, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import type { FormRef } from '../../app/types/FormRef';
import BackIcon from '../../assets/back-icon.svg';
import { ConfirmDialog } from '../../components/confirm_dialog/ConfirmDialog';

const ActivateStudent = () => {
  const { studentId } = useLocation().state;
  const { data: student } = useGetStudentByIdQuery(studentId);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const paymentRef = useRef<FormRef>(null);
  const planRef = useRef<FormRef>(null);

  const [activateStudent, { isLoading: isActivating }] = useActivateStudentMutation();

  const handleActivate = async () => {
    const isPaymentValid = await paymentRef.current?.submit();
    const isPlanValid = await planRef.current?.submit();

    if (!isPaymentValid || !isPlanValid) return;

    const paymentValues = paymentRef.current?.getValues();
    const planValues = planRef.current?.getValues();

    try {
      await activateStudent({
        studentId,
        ...paymentValues,
        ...planValues,
      }).unwrap();

      toast.success('El alumno ha sido dado de alta.');
      navigate(-1);
    } catch {
      toast.error('Ocurrió un error al dar de alta al alumno');
    }
  };

  return (
    <s.MainContainer>
      {showConfirm && (
        <ConfirmDialog
          message={`¿Estás seguro de dar de alta a ${student?.name} ${student?.lastName}?`}
          onConfirm={() => {
            setShowConfirm(false);
            handleActivate();
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <s.HeaderContainer>
        <img
          src={BackIcon}
          alt="back-icon"
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer' }}
        />

        <s.Title>Dar de alta</s.Title>
      </s.HeaderContainer>

      <s.DataContainer>
        <s.PaymentContainer>
          <PaymentData ref={paymentRef} />
        </s.PaymentContainer>
        <PlanData ref={planRef} />
      </s.DataContainer>
      <s.ButtonContainer>
        <Button variant="primary" size="medium" onClick={() => setShowConfirm(true)}>
          {isActivating ? 'Activando...' : 'Confirmar alta'}
        </Button>
      </s.ButtonContainer>
    </s.MainContainer>
  );
};
export default ActivateStudent;
