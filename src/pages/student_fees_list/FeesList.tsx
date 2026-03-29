import { useLocation, useNavigate } from 'react-router';
import { SortableButton } from '../../components/sort_button/SortButton';
import * as s from './FeesList.styles';
import Filter from '../../components/filter/Filter';
import Button from '../../components/button/Button';
import Table from '../../components/table/Table';
import type { Column } from '../../app/types/table';
import AddIcon from '../../assets/add-icon.svg';
import BackIcon from '../../assets/back-icon.svg';
import StudentIcon from '../../assets/student-icon.svg';
import ViewIcon from '../../assets/openEye-icon.png';
import CoinIcon from '../../assets/coin-icon.svg';
import type { StudentMonthlyFeeResponse } from '../../app/types/responses/StudentMonthlyFee.type';
import { useEffect, useState } from 'react';
import { ConfirmDialog } from '../../components/confirm_dialog/ConfirmDialog';
import {
  useGetStudentByIdQuery,
  useGetStudentMonthlyFeesQuery,
  useCreateStudentMonthlyFeeMutation,
} from '../../app/services/StudentService';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { translateMonth } from '../../utils/TranslateMonths';
import DateFilter from '../../components/date_filter/DateFilter';
import { toast } from 'react-hot-toast';
import { useUpdateMonthlyFeeMutation } from '../../app/services/MonthlyFeeService';
import PaymentInfoModal from './payment_detail/paymentInfo';
import { MonthsOfYear } from '../../utils/MonthsOfYear';
import {
  MONTHLY_FEE_STATUS_CAN_BE_PAID,
  MONTHLY_FEE_STATUS_CAN_VIEW_PAYMENT,
  MonthlyFeesStatusOptions,
} from '../../utils/MonthlyFeesStatus';
import { formatDateToIsoString } from '../../utils/DateFormatter';
import { MisAlumnos } from '../../routes/RoutesUtils';
import type {
  PAY_MONTHLY_FEE_MODAL_TYPE,
  PAYMENT_DETAIL_MODAL_TYPE,
} from '../../utils/MonthlyFeesStatus';
import PaymentMetrics from './PaymentMetrics';
import { Pagination } from '../../components/pagination/Pagination';
import { SearchNotFound } from '../../components/search_not_found/SearchNotFound';
import type { SortConfig } from '../../app/types/sort';
function StudentFeesList() {
  const location = useLocation();
  const { studentId } = location.state || {};
  const {
    data: student,
    isLoading: fetchingStudent,
    isError: errorFetchingStudent,
  } = useGetStudentByIdQuery(studentId);

  const navigate = useNavigate();
  const [monthFilter, setMonthFilter] = useState('');
  const [expirationDateFilter, setExpirationDateFilter] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState('');
  const [modalType, setModalType] = useState<
    PAY_MONTHLY_FEE_MODAL_TYPE | PAYMENT_DETAIL_MODAL_TYPE | null
  >(null);
  const [selectedFeeId, setSelectedFeeId] = useState<string | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [payMonthlyFee] = useUpdateMonthlyFeeMutation();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState<SortConfig[]>([]);
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
        page: page - 1,
        size,
        sort: sort.length > 0 ? sort : undefined,
      }
      : skipToken,
  );

  const [createMonthlyFee] = useCreateStudentMonthlyFeeMutation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  useEffect(() => {
    setPage(1);
  }, [monthFilter, statusFilter, formattedExpirationDate, sort]);
  if (fetchingStudent) return <p>Cargando información del alumno...</p>;
  if (errorFetchingStudent) return <p>Error al cargar la información del alumno.</p>;
  if (!student) return <p>Alumno no encontrado.</p>;
  const handleConfirmCreateFee = async () => {
    await createMonthlyFee({ studentId: student.id });
    setShowConfirmDialog(false);
  };

  const handleOpenPayModal = (feeId: string) => {
    setSelectedFeeId(feeId);
    setModalType('pay');
  };
  const handleOpenPaymentInfoModal = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setModalType('details');
  };
  const handleConfirmPay = async () => {
    if (!student?.id) {
      toast.error('Alumno no disponible para registrar la cuota como pagada');
      return;
    }
    payMonthlyFee({
      feeId: selectedFeeId!,
      studentId: student.id,
    })
      .unwrap()
      .then(() => {
        toast.success('Cuota registrada como pagada correctamente');
      })
      .catch(() => {
        toast.error('Ocurrió un error al registrar la cuota como pagada');
      })
      .finally(() => {
        setModalType(null);
        setSelectedFeeId(null);
      });
  };

  if (isLoading) return <p>Cargando cuotas...</p>;
  if (isError) return <p>Error al cargar cuotas.</p>;
  if (!fees) return <SearchNotFound message="No hay información disponible." />;
  const columns: Column<StudentMonthlyFeeResponse>[] = [
    {
      header: (
        <SortableButton
          text="Nro de cuota"
          onSort={(isAsc) => setSort([{ property: 'number', direction: isAsc ? 'ASC' : 'DESC' }])}
        />
      ),
      accessor: 'number',
    },
    {
      header: (
        <SortableButton
          text="Monto"
          onSort={(isAsc) => setSort([{ property: 'amount', direction: isAsc ? 'ASC' : 'DESC' }])}
        />
      ),
      accessor: 'amount',
    },
    {
      header: (
        <SortableButton
          text={'Fecha de\nvencimiento'} allowWrap
          onSort={(isAsc) => setSort([{ property: 'expirationDate', direction: isAsc ? 'ASC' : 'DESC' }])}
        />
      ),
      accessor: 'expirationDate',
      render: (student) => <span>{student.expirationDate}</span>,
    },
    {
      header: "Mes",
      accessor: 'month',
      render: (student) => <span>{translateMonth(student.month)} </span>,
    },



    {
      header: 'Estado',
      accessor: 'status',
      render: (student) => (
        <s.FeeStatusContainer>
          <s.FeeStatus $status={student.status}>
            {student.status === 'Pagado vencido' ? 'Pago con atraso' : student.status}
          </s.FeeStatus>
        </s.FeeStatusContainer>
      ),
    },
    {
      header: 'Pago',
      render: (student) => {
        const canPay = MONTHLY_FEE_STATUS_CAN_BE_PAID.includes(student.status);
        const canViewPayment = MONTHLY_FEE_STATUS_CAN_VIEW_PAYMENT.includes(student.status);
        if (canPay) {
          return (
            <s.ActionButton onClick={() => handleOpenPayModal(student.id)}>
              Pagar
              <s.CoinIconStyles src={CoinIcon} alt="coin-icon" />
            </s.ActionButton>
          );
        }

        if (canViewPayment) {
          return (
            <s.ActionButton
              onClick={() => {
                handleOpenPaymentInfoModal(student.paymentId);
              }}
            >
              Ver pago
              <s.ViewIconStyle src={ViewIcon} alt="view-icon" />
            </s.ActionButton>
          );
        }
        return <></>;
      },
    },
  ];

  return (
    <s.StudentsContainer>
      <s.ContentContainer>
        <s.InformationStudent>
          <s.TitleContainer>
            <img
              src={BackIcon}
              alt="back-icon"
              onClick={() => navigate(MisAlumnos)}
              style={{ cursor: 'pointer' }}
            />
            <s.Title>LISTADO DE CUOTAS</s.Title>
          </s.TitleContainer>
          <s.SubTitle $isBold={true}>
            <img src={StudentIcon} alt="student-icon" width={16} height={16} />
            {student?.name} {student?.lastName}
          </s.SubTitle>
          <s.SubTitle>Cantidad de días: {student?.numberOfDays}</s.SubTitle>
          <s.SubTitle>Día de vencimiento: {student?.paymentDay}</s.SubTitle>
        </s.InformationStudent>
        <s.MetricsContainer>
          <PaymentMetrics studentId={student.id} />
        </s.MetricsContainer>
        <s.FiltersContainer>
          <s.LeftContainer>
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
                setStatusFilter('');
                setExpirationDateFilter(undefined);
                setMonthFilter('');
                setSort([]);
              }}
            >
              Limpiar filtros
            </Button>
          </s.LeftContainer>
          <s.RightContainer>
            <Button
              variant="primary"
              size="medium"
              icon={<img src={AddIcon} alt="Add Icon" />}
              onClick={() => setShowConfirmDialog(true)}
            >
              Nueva cuota
            </Button>
            {showConfirmDialog && (
              <ConfirmDialog
                message={`¿Estás seguro de que deseas generar una cuota para ${student.name} ${student.lastName}?`}
                onConfirm={handleConfirmCreateFee}
                onCancel={() => setShowConfirmDialog(false)}
              />
            )}
          </s.RightContainer>
        </s.FiltersContainer>
        {modalType === 'pay' && (
          <ConfirmDialog
            message="¿Estás seguro de realizar este pago?"
            onConfirm={handleConfirmPay}
            onCancel={() => setModalType(null)}
          />
        )}
        {modalType === 'details' && (
          <PaymentInfoModal
            isOpen={modalType === 'details'}
            onClose={() => setModalType(null)}
            paymentId={selectedPaymentId}
          />
        )}
        <Table columns={columns} data={fees.content} />
      </s.ContentContainer>

      <s.PaginationContainer>
        <Pagination
          page={page}
          size={size}
          totalElements={fees.totalElements}
          totalPages={fees.totalPages}
          onPageChange={setPage}
          onSizeChange={(newSize) => {
            setPage(1);
            setSize(newSize);
          }}
        />
      </s.PaginationContainer>
    </s.StudentsContainer>
  );
}
export default StudentFeesList;
