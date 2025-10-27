import { useLocation, useNavigate } from "react-router";
import { SortableButton } from "../../components/sort_button/SortButton";
import {
  StudentsContainer,
  FiltersContainer,
  LeftContainer,
  RightContainer,
} from "./FeesList.styles";
import Filter from "../../components/filter/Filter";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import type { Column } from "../../app/types/table";
import AddIcon from "../../assets/add-icon.svg";
import type { StudentMonthlyFeeResponse } from "../../app/types/responses/StudentMonthlyFee.type";
import { useState } from "react";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import { useGetStudentMonthlyFeesQuery } from "../../app/services/StudentService";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { translateMonth } from "../../utils/TranslateMonths";
import { formatCurrency } from "../../utils/Formatter";
import { formatDate } from "../../utils/DateFormatter";
import { translateStatus } from "../../utils/TranslateStatusFee";
function StudentFeesList() {
  const location = useLocation();
  const { studentId } = location.state || {};
  console.log("studentId recibido:", studentId);
  const {
    data: fees,
    isLoading,
    isError,
  } = useGetStudentMonthlyFeesQuery(studentId ?? skipToken);
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [modalType, setModalType] = useState<"pay" | null>(null);
  const [selectedFeeId, setSelectedFeeId] = useState<string | null>(null);
  const handleOpenPayModal = (feeId: string) => {
    setSelectedFeeId(feeId);
    setModalType("pay");
  };
  console.log("cuotas:", fees);
  const handleConfirmPay = () => {
    // console.log("Realizando pago de cuota:", selectedFeeId);
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
      Cell: ({ original }) => <span>{translateStatus(original.status)}</span>,
    },
    {
      header: "Pago",
      Cell: ({ original }) =>
        original.status === "Pendiente" ? (
          <button onClick={() => handleOpenPayModal(original.id)}>Pagar</button>
        ) : (
          <button>Ver pago</button>
        ),
    },
  ];

  return (
    <StudentsContainer>
      <FiltersContainer>
        <LeftContainer>
          <Filter
            placeholder="Filtrar por mes"
            options={[
              { label: "Enero", value: "ene" },
              { label: "Febrero", value: "feb" },
              { label: "Marzo", value: "mar" },
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
              { label: "Activo", value: "activo" },
              { label: "Inactivo", value: "inactivo" },
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
            onClick={() => navigate("/nuevo-alumno")}
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
