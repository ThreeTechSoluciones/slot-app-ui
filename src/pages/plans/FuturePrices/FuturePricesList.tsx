import * as s from './FuturePricesList.styles';
import CalendarIcon from '../../../assets/calendar-icon.svg';
import DeleteIcon from '../../../assets/delete-icon.svg';
import type { PlanResponse } from '../../../app/types/responses/PlanResponse.type';
import type { PriceResponse } from '../../../app/types/responses/PriceResponse.type';
import { formatCurrency } from '../../../utils/Formatter';
import { formatDateReverse } from '../../../utils/DateFormatter';
import Button from '../../../components/button/Button';
import AddIcon from '../../../assets/add-icon.svg';
import { Tooltip } from '../../../components/tooltip/Tooltip';

interface FuturePricesListProps {
  selectedPlan: PlanResponse | null | undefined;
  nextPrice: PriceResponse | null | undefined;
  futurePrices: PriceResponse[] | null | undefined;
  onAddPrice: () => void;
  onDeletePrice: (price: PriceResponse) => void;
}

interface PriceItemProps {
  price: PriceResponse;
  daysUntilActive: string | React.ReactNode;
  isLast?: boolean;
  isOnlyOne?: boolean;
  onDeletePrice: (price: PriceResponse) => void;
}

const PriceItem = ({
  price,
  daysUntilActive,
  isLast,
  isOnlyOne,
  onDeletePrice,
}: PriceItemProps) => (
  <s.FuturePriceItem $isLast={isLast} $isOnlyOne={isOnlyOne}>
    <img src={CalendarIcon} alt="Calendar" width={20} height={20} />
    <s.PriceInfoContainer>
      <s.Price>{formatCurrency(price.amount)}</s.Price>
      <s.StartDate>{formatDateReverse(price.startDate)}</s.StartDate>
    </s.PriceInfoContainer>
    {daysUntilActive}
    <s.DeleteIcon
      src={DeleteIcon}
      alt="Delete"
      width={24}
      height={24}
      onClick={() => onDeletePrice(price)}
    />
  </s.FuturePriceItem>
);

function FuturePricesList({
  selectedPlan,
  nextPrice,
  futurePrices,
  onAddPrice,
  onDeletePrice
}: FuturePricesListProps) {
  const totalFuturePrices = selectedPlan?.totalFuturePrices;

  return (
    <s.FuturePricesContainer>
      <s.Subtitle>
        {totalFuturePrices === 1
          ? '1 cambio de precio programado'
          : `${totalFuturePrices} cambios de precio programados`}
      </s.Subtitle>
      <s.FuturePricesListContainer>
        {nextPrice && (
          <PriceItem
            price={nextPrice}
            daysUntilActive={
              <Tooltip
                content={`Comienza en ${nextPrice?.daysUntilActive} ${nextPrice?.daysUntilActive === 1 ? 'día' : 'días'}`}
              >
                <s.DaysUntilActiveComp $variant="next">Próximo</s.DaysUntilActiveComp>
              </Tooltip>
            }
            isLast={!futurePrices?.length}
            isOnlyOne={totalFuturePrices === 1}
            onDeletePrice={onDeletePrice}
          />
        )}
        {futurePrices?.map((price, index) => (
          <PriceItem
            key={price.id}
            price={price}
            daysUntilActive={
              <s.DaysUntilActiveComp $variant="future">
                {price.daysUntilActive} días
              </s.DaysUntilActiveComp>
            }
            isLast={index === futurePrices.length - 1}
            onDeletePrice={onDeletePrice}
          />
        ))}
      </s.FuturePricesListContainer>
      <Button
        onClick={onAddPrice}
        variant="primary"
        size="large"
        fontsize="medium"
        icon={<img src={AddIcon} alt="Add Icon" />}
      >
        Programar nuevo precio
      </Button>
    </s.FuturePricesContainer>
  );
}
export default FuturePricesList;
