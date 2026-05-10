import type { PlanResponse } from '../../../app/types/responses/PlanResponse.type';
import { Tooltip } from '../../../components/tooltip/Tooltip';
import { formatCurrency } from '../../../utils/Formatter';
import * as s from './FuturePricesComponent.styles';
import ArrowIcon from '../../../assets/chevron-left-icon.svg';
import PlusIcon from '../../../assets/plus-icon.svg';

import { formatDateReverse } from '../../../utils/DateFormatter';

interface FuturePricesComponentProps {
  plan: PlanResponse;
  onClick: () => void;
}

const FuturePricesComponent = ({ plan, onClick }: FuturePricesComponentProps) => {
  const totalFuturePrices = plan.totalFuturePrices;
  return (
    <s.NextPriceContainer>
      <s.NextPriceSpacer />
      <s.NextPriceData>
        <s.Price>{plan.nextPrice ? formatCurrency(plan.nextPrice.amount) : '-'}</s.Price>
        <s.Date>
          {plan.nextPrice?.startDate ? formatDateReverse(plan.nextPrice.startDate) : ''}
        </s.Date>
      </s.NextPriceData>
      <s.ShowFuturePricesButton onClick={onClick}>
        {totalFuturePrices !== 0 ? (
          <Tooltip content="Ver próximos precios">
            <s.ButtonContent>
              {totalFuturePrices}
              <img
                src={ArrowIcon}
                width="12"
                height="12"
                style={{ transform: 'rotate(270deg)' }}
                alt="Flecha"
              />
            </s.ButtonContent>
          </Tooltip>
        ) : (
          <Tooltip content="Programar un precio">
            <img src={PlusIcon} width="11" height="11" alt="Agregar" />
          </Tooltip>
        )}
      </s.ShowFuturePricesButton>
    </s.NextPriceContainer>
  );
};

export default FuturePricesComponent;
