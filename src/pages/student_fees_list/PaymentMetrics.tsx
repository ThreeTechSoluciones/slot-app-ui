import { useGetStudentPaymentMetricsQuery } from "../../app/services/MetricService";
import {
  MetricCards,
  type MetricItem,
} from "../../components/metric_card/MetricCard";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { CgDanger } from "react-icons/cg";
import {
  DANGER_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "../../utils/Stylesheet";

interface PaymentMetricsProps {
  studentId: string;
}

const PaymentMetrics = ({ studentId }: PaymentMetricsProps) => {
  const {
    data: metrics,
    isLoading,
    isError,
  } = useGetStudentPaymentMetricsQuery({ studentId });

  if (isLoading) return <div>Cargando estadísticas...</div>;
  if (isError || !metrics) return null;

  const items: MetricItem[] = [
    {
      title: "Cuotas Pagadas",
      value: metrics.paidCount,
      description:
        metrics.paidCount === 1
          ? "cuota fue pagada."
          : "cuotas fueron pagadas.",
      icon: <FiCheckCircle size={20} />,
      color: SUCCESS_COLOR,
    },
    {
      title: "Cuotas Vencidas",
      value: metrics.expiredCount,
      description:
        metrics.expiredCount === 1
          ? "cuota se encuentra vencida."
          : "cuotas se encuentran vencidas.",
      icon: <FiXCircle size={20} />,
      color: DANGER_COLOR,
    },
    {
      title: "Pagos Atrasados",
      value: metrics.paidOutOfTimeCount,
      description:
        metrics.paidOutOfTimeCount === 1
          ? "cuota no fue pagada."
          : "cuotas no fueron pagadas.",
      icon: <CgDanger size={20} />,
      color: WARNING_COLOR,
    },
  ];

  return <MetricCards items={items} />;
};

export default PaymentMetrics;
