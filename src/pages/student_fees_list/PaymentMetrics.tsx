import { skipToken } from "@reduxjs/toolkit/query";
import { useGetStudentPaymentMetricsQuery } from "../../app/services/MetricService";
import {
  MetricCards,
  type MetricItem,
} from "../../components/metric_card/MetricCard";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { DANGER_COLOR, SUCCESS_COLOR } from "../../utils/Stylesheet";

interface PaymentMetricsProps {
  studentId: string;
}

const PaymentMetrics = ({ studentId }: PaymentMetricsProps) => {
  const {
    data: metrics,
    isLoading,
    isError,
  } = useGetStudentPaymentMetricsQuery(studentId ? { studentId } : skipToken);

  if (isLoading) return <div>Cargando estadísticas...</div>;
  if (isError || !metrics) return null;

  const items: MetricItem[] = [
    {
      title: "Cuotas Pagadas",
      value: metrics.payedCount,
      subtitle: "cuotas fueron pagadas.",
      icon: <FiCheckCircle size={20} />,
      color: SUCCESS_COLOR,
      isSuccess: true,
    },
    {
      title: "Cuotas al día",
      value: metrics.onTimeCount,
      subtitle: "cuotas fueron pagadas al día.",
      icon: <FiCheckCircle size={20} />,
      color: SUCCESS_COLOR,
      isSuccess: true,
    },
    {
      title: "Cuotas adeudadas",
      value: metrics.outstandingCount,
      subtitle: "cuota no fue pagada.",
      icon: <FiXCircle size={20} />,
      color: DANGER_COLOR,
      isSuccess: false,
    },
  ];

  return <MetricCards items={items} />;
};

export default PaymentMetrics;
