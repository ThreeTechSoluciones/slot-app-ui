import type { ReactNode } from 'react';
import * as s from './MetricCard.styles';

export interface MetricItem {
  title: string;
  value: number | string;
  description?: React.ReactNode;
  icon?: ReactNode;
  color: string;
}

interface MetricCardsProps {
  items: MetricItem[];
}

export const MetricCards = ({ items }: MetricCardsProps) => {
  return (
    <s.MetricsContainer>
      {items.map((item, index) => (
        <s.Card key={index} $borderColor={item.color}>
          <s.Title $color={item.color}>{item.title}</s.Title>

          <s.ValueContainer>
            <s.Value>{item.value}</s.Value>
            {item.icon && <s.IconWrapper $color={item.color}>{item.icon}</s.IconWrapper>}
          </s.ValueContainer>

          {item.description && <s.Description>{item.description}</s.Description>}
        </s.Card>
      ))}
    </s.MetricsContainer>
  );
};
