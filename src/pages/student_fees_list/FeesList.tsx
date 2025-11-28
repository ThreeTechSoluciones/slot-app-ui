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

function StudentFeesList() {
  const location = useLocation();
  const { student } = location.state || {};
  const { data: studentDetails } = useGetStudentByIdQuery(student.id);
  const navigate = useNavigate();
  const [monthFilter, setMonthFilter] = useState("");
  const [expirationDateFilter, setExpirationDateFilter] = useState<Date | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState("");
  const [modalType, setModalType] = useState<"pay" | "details" | null>(null);
  const [selectedFeeId, setSelectedFeeId] = useState<string | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );
  const [payMonthlyFee] = useUpdateMonthlyFeeMutation();

  const normalizeDate = (date: Date | string | null) => {
    if (!date) return undefined;

    const d = new Date(date);

    if (isNaN(d.getTime())) return undefined;
    return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };
  const formattedExpirationDate = normalizeDate(expirationDateFilter);
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
  const handleOpenPaymentInfoModal = (paymentId?: string) => {
    setSelectedPaymentId(paymentId!);
    setModalType("details");
  };
  const handleConfirmPay = async () => {
    if (!selectedFeeId) return;
    payMonthlyFee({
      feeId: selectedFeeId,
      studentId: student.id,
    })
      .unwrap()
      .then(() => {
        toast.success("Pago realizado correctamente");
      })
      .catch(() => {
        toast.error("Ocurrió un error al procesar el pago");
      })
      .finally(() => {
        setModalType(null);
        setSelectedFeeId(null);
      });
  };

  const handleCancelPay = () => {
    setModalType(null);
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
      Cell: ({ original }) => <span>{translateMonth(original.month)} </span>,
    },

    {
      header: <SortableButton text={"Fecha de\nvencimiento"} allowWrap />,
      accessor: "expirationDate",
      Cell: ({ original }) => <span>{original.expirationDate}</span>,
    },
    {
      header: <SortableButton text="Monto" />,
      accessor: "amount",
      Cell: ({ original }) => <span>{formatCurrency(original.amount)}</span>,
    },
    {
      header: "Estado",
      accessor: "status",
      Cell: ({ original }) => (
        <FeeStatusContainer>
          <FeeStatus $status={original.status}>{original.status}</FeeStatus>
        </FeeStatusContainer>
      ),
    },
    {
      header: "Pago",
      Cell: ({ original }) => {
        const canPay = ["Pendiente", "Vencida"].includes(original.status);
        const canViewPayment = ["Pagado", "Pagado vencido"].includes(
          original.status
        );
        if (canPay) {
          return (
            <ActionButton onClick={() => handleOpenPayModal(original.id)}>
              Pagar
              <CoinIconStyles src={CoinIcon} alt="coin-icon" />
            </ActionButton>
          );
        }

        if (canViewPayment) {
          return (
            <ActionButton
              onClick={() => {
                handleOpenPaymentInfoModal(original.paymentId);
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
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
          <Title>LISTADO DE CUOTAS</Title>
        </TitleContainer>
        <SubTitle>
          <img src={StudentIcon} alt="student-icon" width={20} height={20} />
          {student?.name} {student?.lastname}
        </SubTitle>
        <SubTitle>Cantidad de días: {studentDetails?.numberOfDays}</SubTitle>
        <SubTitle>Día de pago: {studentDetails?.paymentDay}</SubTitle>
      </InformationStudent>
      <FiltersContainer>
        <LeftContainer>
          <Filter
            placeholder="Filtrar por mes"
            options={[
              { label: "Enero", value: "JANUARY" },
              { label: "Febrero", value: "FEBRUARY" },
              { label: "Marzo", value: "MARCH" },
              { label: "Abril", value: "APRIL" },
              { label: "Mayo", value: "MAY" },
              { label: "Junio", value: "JUNE" },
              { label: "Julio", value: "JULY" },
              { label: "Agosto", value: "AUGUST" },
              { label: "Septiembre", value: "SEPTEMBER" },
              { label: "Octubre", value: "OCTOBER" },
              { label: "Noviembre", value: "NOVEMBER" },
              { label: "Diciembre", value: "DECEMBER" },
            ]}
            value={monthFilter}
            onSelect={setMonthFilter}
          />
          <DateFilter
            value={expirationDateFilter}
            onChange={setExpirationDateFilter}
          />

          <Filter
            placeholder="Filtrar por estado"
            options={[
              { label: "Pendiente", value: "PENDING" },
              { label: "Vencida", value: "OUT_OF_TIME" },
              { label: "Pagado", value: "PAYED" },
              { label: "Pagado vencido", value: "PAYED_OUT_OF_TIME" },
            ]}
            value={statusFilter}
            onSelect={setStatusFilter}
          />

          <Button
            variant="primary"
            size="small"
            onClick={() => {
              setStatusFilter("");
              setExpirationDateFilter(null);
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
            //onClick={() => navigate("/")} Para cuando este la ruta a la nueva cuota.
          >
            Nueva cuota
          </Button>
        </RightContainer>
      </FiltersContainer>
      {modalType === "pay" && (
        <ConfirmDialog
          message="¿Estás seguro de realizar este pago?"
          onConfirm={handleConfirmPay}
          onCancel={handleCancelPay}
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
