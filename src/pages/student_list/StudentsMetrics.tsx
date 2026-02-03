import { useGetStudentSummaryQuery } from "../../app/services/MetricService";
import {
  MetricCards,
  type MetricItem,
} from "../../components/metric_card/MetricCard";
import { FiCheckCircle, FiXCircle, FiUserCheck } from "react-icons/fi";
import { CgDanger } from "react-icons/cg";
import {
  DANGER_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "../../utils/Stylesheet";

const StudentMetrics = () => {
  const { data: metrics, isLoading, isError } = useGetStudentSummaryQuery();

  if (isLoading) return <div>Cargando estadísticas...</div>;
  if (isError || !metrics) return null;

  const items: MetricItem[] = [
    {
      title: "Alumnos activos",
      value: metrics.activeStudentsCount,
      description:
        metrics.activeStudentsCount === 1
          ? "alumno está activo."
          : "alumnos están activos.",
      icon: <FiUserCheck size={20} />,
      color: SUCCESS_COLOR,
    },
    {
      title: "Cuotas al día",
      value: metrics.activeStudentsOnTimeCount,
      description:
        metrics.activeStudentsOnTimeCount === 1
          ? "alumno no debe cuotas."
          : "alumnos no deben cuotas.",
      icon: <FiCheckCircle size={20} />,
      color: SUCCESS_COLOR,
    },
    {
      title: "Deudas de activos",
      value: metrics.activeStudentsWithDebtCount,
      description:
        metrics.activeStudentsWithDebtCount === 1 ? (
          <>
            alumno que <strong>asiste</strong> a tu clase debe cuotas.
          </>
        ) : (
          <>
            alumnos que <strong>asisten</strong> a tu clase deben cuotas.
          </>
        ),
      icon: <CgDanger size={20} />,
      color: WARNING_COLOR,
    },
    {
      title: "Deudas de inactivos",
      value: metrics.inactiveStudentsWithDebtCount,
      description:
        metrics.inactiveStudentsWithDebtCount === 1 ? (
          <>
            alumno que <strong>no asiste</strong> a tu clase debe cuotas.
          </>
        ) : (
          <>
            alumnos que <strong> no asisten</strong> a tus clases deben cuotas.
          </>
        ),
      icon: <FiXCircle size={20} />,
      color: DANGER_COLOR,
    },
  ];

  return <MetricCards items={items} />;
};

export default StudentMetrics;
