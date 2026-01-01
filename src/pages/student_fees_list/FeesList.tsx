import { useLocation, useNavigate } from "react-router";
import { SortableButton } from "../../components/sort_button/SortButton";
import {
  StudentsContainer,
  FiltersContainer,
  LeftContainer,
  RightContainer,
  ActionButton,
  ViewIconStyle,
  FeeStatus,
  FeeStatusContainer,
  InformationStudent,
  Title,
  TitleContainer,
  CoinIconStyles,
  SubTitle,
} from "./FeesList.styles";
import Filter from "../../components/filter/Filter";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import type { Column } from "../../app/types/table";

import AddIcon from "../../assets/add-icon.svg";
import BackIcon from "../../assets/back-icon.svg";
import StudentIcon from "../../assets/student-icon.svg";
import ViewIcon from "../../assets/openEye-icon.png";
import CoinIcon from "../../assets/coin-icon.svg";

import type { StudentMonthlyFeeResponse } from "../../app/types/responses/StudentMonthlyFee.type";
import { useState } from "react";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import {
  useGetStudentByIdQuery,
  useGetStudentMonthlyFeesQuery,
} from "../../app/services/StudentService";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { translateMonth } from "../../utils/TranslateMonths";
import { formatCurrency } from "../../utils/Formatter";
import DateFilter from "../../components/date_filter/DateFilter";
import { toast } from "react-hot-toast";
import { useUpdateMonthlyFeeMutation } from "../../app/services/MonthlyFeeService";
import PaymentInfoModal from "../../components/payment_detail/paymentInfo";
import { MonthsOfYear } from "../../utils/MonthsOfYear";
import {
  MONTHLY_FEE_STATUS_CAN_BE_PAID,
  MONTHLY_FEE_STATUS_CAN_VIEW_PAYMENT,
  MonthlyFeesStatusOptions,
} from "../../utils/MonthlyFeesStatus";
import { formatDateToIsoString } from "../../utils/DateFormatter";
import { MisAlumnos } from "../../routes/RoutesUtils";
import type {
  PAY_MONTHLY_FEE_MODAL_TYPE,
  PAYMENT_DETAIL_MODAL_TYPE,
} from "../../utils/MonthlyFeesStatus";
function StudentFeesList() {
  const location = useLocation();
  const { studentId } = location.state || {};
  const { data: student } = useGetStudentByIdQuery(studentId);
  const navigate = useNavigate();
  const [monthFilter, setMonthFilter] = useState("");
  const [expirationDateFilter, setExpirationDateFilter] = useState<
    Date | undefined
  >(undefined);
  const [statusFilter, setStatusFilter] = useState("");
  const [modalType, setModalType] = useState<
    PAY_MONTHLY_FEE_MODAL_TYPE | PAYMENT_DETAIL_MODAL_TYPE | null
  >(null);
  const [selectedFeeId, setSelectedFeeId] = useState<string | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );
  const [payMonthlyFee] = useUpdateMonthlyFeeMutation();

  const formattedExpirationDate = expirationDateFilter
    ? formatDateToIsoString(expirationDateFilter)
    : undefined;
  const {
    data: fees,
    isLoading,
    isError,
  } = useGetStudentMonthlyFeesQuery(
    student?.id
      ? {
          studentId: student.id,
          month: monthFilter || undefined,
          expirationDate: formattedExpirationDate,
          status: statusFilter || undefined,
        }
      : skipToken
  );
  const handleOpenPayModal = (feeId: string) => {
    setSelectedFeeId(feeId);
    setModalType("pay");
  };
  const handleOpenPaymentInfoModal = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setModalType("details");
  };
  const handleConfirmPay = async () => {
    if (!student?.id) {
      toast.error("Alumno no disponible para registrar la cuota como pagada");
      return;
    }
    payMonthlyFee({
      feeId: selectedFeeId!,
      studentId: student.id,
    })
      .unwrap()
      .then(() => {
        toast.success("Cuota registrada como pagada correctamente");
      })
      .catch(() => {
        toast.error("Ocurrió un error al registrar la cuota como pagada");
      })
      .finally(() => {
        setModalType(null);
        setSelectedFeeId(null);
      });
  };

  if (isLoading) return <p>Cargando cuotas...</p>;
  if (isError) return <p>Error al cargar cuotas.</p>;

  const columns: Column<StudentMonthlyFeeResponse>[] = [
    {
      header: <SortableButton text="N° de cuota" />,
      accessor: "number",
    },

    {
      header: <SortableButton text="Mes" />,
      accessor: "month",
      render: (student) => <span>{translateMonth(student.month)} </span>,
    },

    {
      header: <SortableButton text={"Fecha de\nvencimiento"} allowWrap />,
      accessor: "expirationDate",
      render: (student) => <span>{student.expirationDate}</span>,
    },
    {
      header: <SortableButton text="Monto" />,
      accessor: "amount",
      render: (student) => <span>{formatCurrency(student.amount)}</span>,
    },
    {
      header: "Estado",
      accessor: "status",
      render: (student) => (
        <FeeStatusContainer>
          <FeeStatus $status={student.status}>{student.status}</FeeStatus>
        </FeeStatusContainer>
      ),
    },
    {
      header: "Pago",
      render: (student) => {
        const canPay = MONTHLY_FEE_STATUS_CAN_BE_PAID.includes(student.status);
        const canViewPayment = MONTHLY_FEE_STATUS_CAN_VIEW_PAYMENT.includes(
          student.status
        );
        if (canPay) {
          return (
            <ActionButton onClick={() => handleOpenPayModal(student.id)}>
              Pagar
              <CoinIconStyles src={CoinIcon} alt="coin-icon" />
            </ActionButton>
          );
        }

        if (canViewPayment) {
          return (
            <ActionButton
              onClick={() => {
                handleOpenPaymentInfoModal(student.paymentId);
              }}
            >
              Ver pago
              <ViewIconStyle src={ViewIcon} alt="view-icon" />
            </ActionButton>
          );
        }
        return <></>;
      },
    },
  ];
  return (
    <StudentsContainer>
      <InformationStudent>
        <TitleContainer>
          <img
            src={BackIcon}
            alt="back-icon"
            onClick={() => navigate(MisAlumnos)}
            style={{ cursor: "pointer" }}
          />
          <Title>LISTADO DE CUOTAS</Title>
        </TitleContainer>
        <SubTitle $isBold={true}>
          <img src={StudentIcon} alt="student-icon" width={16} height={16} />
          {student?.name} {student?.lastName}
        </SubTitle>
        <SubTitle>Cantidad de días: {student?.numberOfDays}</SubTitle>
        <SubTitle>Día de pago: {student?.paymentDay}</SubTitle>
      </InformationStudent>
      <FiltersContainer>
        <LeftContainer>
          <Filter
            placeholder="Filtrar por mes"
            options={Object.entries(MonthsOfYear).map(([label, value]) => ({
              label,
              value: value.trim(),
            }))}
            value={monthFilter}
            onSelect={setMonthFilter}
          />
          <DateFilter
            value={expirationDateFilter}
            onChange={(d) => setExpirationDateFilter(d ?? undefined)}
          />

          <Filter
            placeholder="Filtrar por estado"
            options={MonthlyFeesStatusOptions}
            value={statusFilter}
            onSelect={setStatusFilter}
          />

          <Button
            variant="primary"
            size="small"
            onClick={() => {
              setStatusFilter("");
              setExpirationDateFilter(undefined);
              setMonthFilter("");
            }}
          >
            Limpiar filtros
          </Button>
        </LeftContainer>
        <RightContainer>
          <Button
            variant="primary"
            size="medium"
            icon={<img src={AddIcon} alt="Add Icon" />}
          >
            Nueva cuota
          </Button>
        </RightContainer>
      </FiltersContainer>
      {modalType === "pay" && (
        <ConfirmDialog
          message="¿Estás seguro de realizar este pago?"
          onConfirm={handleConfirmPay}
          onCancel={() => setModalType(null)}
        />
      )}
      {modalType === "details" && (
        <PaymentInfoModal
          isOpen={modalType === "details"}
          onClose={() => setModalType(null)}
          paymentId={selectedPaymentId}
        />
      )}
      <Table columns={columns} data={fees || []} />;
    </StudentsContainer>
  );
}
export default StudentFeesList;
