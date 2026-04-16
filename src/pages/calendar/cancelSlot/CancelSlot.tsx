import { toast } from 'react-hot-toast';
import { useCancelSpecificSlotMutation } from '../../../app/services/SpecificSlotService';
import { ConfirmDialog } from '../../../components/confirm_dialog/ConfirmDialog';

interface SlotCancelProps {
  isOpen: boolean;
  onCancel: () => void;
  specificSlotId?: string | null;
  slot?: { startTime: string; endTime: string };
  dayOfWeek: string;
}

export const CancelSlot = ({
  isOpen,
  onCancel,
  specificSlotId,
  slot,
  dayOfWeek,
}: SlotCancelProps) => {
  const [cancelSlot] = useCancelSpecificSlotMutation();

  if(!specificSlotId) return;

  const handleConfirmCancel = async () => {
    return cancelSlot({ specificSlotId })
      .unwrap()
      .then(() => {
        toast.success('Turno cancelado');
        onCancel();
      });
  };

  if (!isOpen) return null;
  const message = `¿Estás seguro de cancelar el turno del ${dayOfWeek} de ${slot?.startTime} a ${slot?.endTime} hs?`;
  return (
    <ConfirmDialog
      message={message}
    />
  );
};
