import {
  FuturePriceItem,
  Price,
  PriceInfoContainer,
  Subtitle,
  Title,
  StartDate,
  DaysUntilActiveComp,
  TitleContainer,
  FuturePricesContainer,
  FuturePricesListContainer,
} from './FuturePricesList.styles';
import CalendarIcon from '../../assets/calendar-icon.svg';
import DeleteIcon from '../../assets/delete-icon.png';
import type { PlanResponse } from '../../app/types/responses/PlanResponse.type';
import type { PriceResponse } from '../../app/types/responses/PriceResponse.type';
import { formatCurrency } from '../../utils/Formatter';
import { formatDateReverse } from '../../utils/DateFormatter';
import Button from '../../components/button/Button';
import AddIcon from '../../assets/add-icon.svg';
import { Tooltip } from '../../components/tooltip/Tooltip';
import { getTotalFuturePrices } from '../../utils/PricesUtil';

interface FuturePricesListProps {
  selectedPlan: PlanResponse | null | undefined;
  nextPrice: PriceResponse | null | undefined;
  futurePrices: PriceResponse[] | null | undefined;
  onAddPrice: () => void;
}

interface PriceItemProps {
  price: PriceResponse;
  daysUntilActive: string | React.ReactNode;
  isLast?: boolean;
  isOnlyOne?: boolean;
}

const PriceItem = ({ price, daysUntilActive, isLast, isOnlyOne }: PriceItemProps) => (
  <FuturePriceItem $isLast={isLast} $isOnlyOne={isOnlyOne}>
    <img src={CalendarIcon} alt="Calendar" width={20} height={20} />
    <PriceInfoContainer>
      <Price>{formatCurrency(price.amount)}</Price>
      <StartDate>{formatDateReverse(price.startDate)}</StartDate>
    </PriceInfoContainer>
    {daysUntilActive}
    <img src={DeleteIcon} alt="Delete" width={24} height={24} />
  </FuturePriceItem>
);

function FuturePricesList({
  selectedPlan,
  nextPrice,
  futurePrices,
  onAddPrice,
}: FuturePricesListProps) {
  const totalFuturePrices = getTotalFuturePrices(selectedPlan);
  return (
    <FuturePricesContainer>
      <TitleContainer>
        <Title>Próximos precios</Title>
        <Subtitle>
          {totalFuturePrices === 1
            ? '1 cambio de precio programado'
            : `${totalFuturePrices} cambios de precio programados`}
        </Subtitle>
      </TitleContainer>
      <FuturePricesListContainer>
        {nextPrice && (
          <PriceItem
            price={nextPrice}
            daysUntilActive={
              <Tooltip content={`Comienza en ${nextPrice?.daysUntilActive} ${nextPrice?.daysUntilActive === 1 ? 'día' : 'días'}`}>
                <DaysUntilActiveComp $variant="next">Próximo</DaysUntilActiveComp>
              </Tooltip>
            }
            isLast={!futurePrices?.length}
            isOnlyOne={totalFuturePrices === 1}
          />
        )}
        {futurePrices?.map((price, index) => (
          <PriceItem
            key={price.id}
            price={price}
            daysUntilActive={
              <DaysUntilActiveComp $variant="future">
                {price.daysUntilActive} días
              </DaysUntilActiveComp>
            }
            isLast={index === futurePrices.length - 1}
            isOnlyOne={totalFuturePrices === 1}
          />
        ))}
      </FuturePricesListContainer>
      <Button
        onClick={onAddPrice}
        variant="primary"
        size="large"
        fontsize="medium"
        icon={<img src={AddIcon} alt="Add Icon" />}
      >
        Programar nuevo precio
      </Button>
    </FuturePricesContainer>
  );
}
export default FuturePricesList;
