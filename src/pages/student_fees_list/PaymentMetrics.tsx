import { useGetStudentPaymentMetricsQuery } from '../../app/services/MetricService';
import { MetricCards, type MetricItem } from '../../components/metric_card/MetricCard';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { DANGER_COLOR, SUCCESS_COLOR } from '../../utils/Stylesheet';

interface PaymentMetricsProps {
  studentId: string;
}

const PaymentMetrics = ({ studentId }: PaymentMetricsProps) => {
  const { data: metrics, isLoading, isError } = useGetStudentPaymentMetricsQuery({ studentId });

  if (isLoading) return <div>Cargando estadísticas...</div>;
  if (isError || !metrics) return null;

  const items: MetricItem[] = [
    {
      title: 'Cuotas Pagadas',
      value: metrics.payedCount,
      description: metrics.payedCount === 1 ? 'cuota fue pagada.' : 'cuotas fueron pagadas.',
      icon: <FiCheckCircle size={20} />,
      color: SUCCESS_COLOR,
    },
    {
      title: 'Cuotas al día',
      value: metrics.onTimeCount,
      description:
        metrics.onTimeCount === 1 ? 'cuota fue pagada al día.' : 'cuotas fueron pagadas al día.',
      icon: <FiCheckCircle size={20} />,
      color: SUCCESS_COLOR,
    },
    {
      title: 'Cuotas adeudadas',
      value: metrics.outstandingCount,
      description:
        metrics.outstandingCount === 1 ? 'cuota no fue pagada.' : 'cuotas no fueron pagadas.',
      icon: <FiXCircle size={20} />,
      color: DANGER_COLOR,
    },
  ];

  return <MetricCards items={items} />;
};

export default PaymentMetrics;
