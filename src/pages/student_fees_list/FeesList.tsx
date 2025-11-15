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
  IconStyles,
  SubTitle,
} from "./FeesList.styles";
import Filter from "../../components/filter/Filter";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import type { Column } from "../../app/types/table";
import AddIcon from "../../assets/add-icon.svg";
import BackIcon from "../../assets/back-icon.svg";
import StudentIcon from "../../assets/student-icon.svg";
import ViewIcon from "../../assets/view-icon.svg";
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
import { formatDate } from "../../utils/DateFormatter";
import { translateStatus } from "../../utils/TranslateStatusFee";

function StudentFeesList() {
  const location = useLocation();
  const { student } = location.state || {};
  const {
    data: fees,
    isLoading,
    isError,
  } = useGetStudentMonthlyFeesQuery(student?.id ?? skipToken);
  const { data: studentDetails } = useGetStudentByIdQuery(student.id);
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [modalType, setModalType] = useState<"pay" | null>(null);
  const [selectedFeeId, setSelectedFeeId] = useState<string | null>(null);

  const handleOpenPayModal = (feeId: string) => {
    setSelectedFeeId(feeId);
    setModalType("pay");
  };

  const handleConfirmPay = () => {
    setModalType(null);
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
      Cell: ({ original }) => (
        <span>{formatDate(original.expirationDate)}</span>
      ),
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
          <FeeStatus $status={original.status}>
            {translateStatus(original.status)}
          </FeeStatus>
        </FeeStatusContainer>
      ),
    },
    {
      header: "Pago",
      Cell: ({ original }) =>
        original.status === "Pendiente" ? (
          <ActionButton onClick={() => handleOpenPayModal(original.id)}>
            Pagar
          </ActionButton>
        ) : (
          <ActionButton>
            Ver pago
            <ViewIconStyle src={ViewIcon} alt="view-icon"></ViewIconStyle>
          </ActionButton>
        ),
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
              { label: "Enero", value: "ene" },
              { label: "Febrero", value: "feb" },
              { label: "Marzo", value: "mar" },
              { label: "Abril", value: "abr" },
              { label: "Mayo", value: "may" },
              { label: "Junio", value: "jun" },
              { label: "Julio", value: "jul" },
              { label: "Agosto", value: "ago" },
              { label: "Septiembre", value: "sep" },
              { label: "Octubre", value: "oct" },
              { label: "Noviembre", value: "nov" },
              { label: "Diciembre", value: "dic" },
            ]}
            value={statusFilter}
            onSelect={setStatusFilter}
          />
          <Filter
            placeholder="Filtrar por fecha de vencimiento"
            options={[
              { label: "Enero", value: "ene" },
              { label: "Febrero", value: "feb" },
              { label: "Marzo", value: "mar" },
            ]}
            value={statusFilter}
            onSelect={setStatusFilter}
          />
          <Filter
            placeholder="Filtrar por estado"
            options={[
              { label: "Pendiente", value: "pending" },
              { label: "Vencida", value: "out-of-time" },
              { label: "Pagada", value: "payed" },
              { label: "Pagado vencido", value: "payed-out-of-time" },
            ]}
            value={statusFilter}
            onSelect={setStatusFilter}
          />

          <Button
            variant="primary"
            size="small"
            onClick={() => {
              setStatusFilter("");
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
            // onClick={() => navigate("/nuevo-alumno")}
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
      <Table columns={columns} data={fees || []} />;
    </StudentsContainer>
  );
}
export default StudentFeesList;
