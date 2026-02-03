import type { ReactNode } from "react";
import * as s from "./MetricCard.styles";

export interface MetricItem {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: ReactNode;
  color: string;
  isSuccess?: boolean;
}

interface MetricCardsProps {
  items: MetricItem[];
}

export const MetricCards = ({ items }: MetricCardsProps) => {
  return (
    <s.MetricsContainer>
      {items.map((item, index) => (
        <s.Card key={index} $borderColor={item.color}>
          <s.Title $isSuccess={item.isSuccess}>{item.title}</s.Title>

          <s.ValueContainer>
            <s.Value>{item.value}</s.Value>
            {item.icon && (
              <s.IconWrapper $color={item.color}>{item.icon}</s.IconWrapper>
            )}
          </s.ValueContainer>

          {item.subtitle && <s.Subtitle>{item.subtitle}</s.Subtitle>}
        </s.Card>
      ))}
    </s.MetricsContainer>
  );
};
