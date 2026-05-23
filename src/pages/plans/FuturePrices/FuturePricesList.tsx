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
import { useDeletePriceMutation } from '../../../app/services/PriceService';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Modal from '../../../components/unified_modal/Modal';
import { ConfirmDialog } from '../../../components/confirm_dialog/ConfirmDialog';

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
  onDelete: (price: PriceResponse) => void;
}

const PriceItem = ({ price, daysUntilActive, isLast, isOnlyOne, onDelete }: PriceItemProps) => (
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
      onClick={() => onDelete(price)}
    />
  </s.FuturePriceItem>
);

function FuturePricesList({
  selectedPlan,
  nextPrice,
  futurePrices,
  onAddPrice
}: FuturePricesListProps) {

  const totalFuturePrices = selectedPlan?.totalFuturePrices;
  const [showConfirm, setShowConfirm] = useState(false);
  const [priceToDelete, setPriceToDelete] = useState<PriceResponse | null>(null);

  const [deletePrice] = useDeletePriceMutation();

  const handleDeletePrice = async () => {
    if (!priceToDelete) return;
    deletePrice({ futurePriceId: priceToDelete.id, planId: selectedPlan?.id! })
      .unwrap()
      .then(() => {
        toast.success('Precio eliminado');
        setShowConfirm(false);
        setPriceToDelete(null);
      });
  };

  const handleOpenConfirm = (price: PriceResponse) => {
    setPriceToDelete(price);
    setShowConfirm(true);
  };

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
            onDelete={handleOpenConfirm}
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
            onDelete={handleOpenConfirm}
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
      <Modal
        onCancel={() => setShowConfirm(false)}
        active={showConfirm}
        onConfirm={handleDeletePrice}
        primaryButtonText="Aceptar"
        secondaryButtonText="Cancelar"
      >
        <ConfirmDialog message="¿Estás seguro de que quieres eliminar este precio?" />
      </Modal>
    </s.FuturePricesContainer>
  );
}
export default FuturePricesList;
