import { toast } from "react-hot-toast";
import { useCancelSpecificSlotMutation } from "../../../app/services/SpecificSlotService";
import { ConfirmDialog } from "../../../components/confirm_dialog/ConfirmDialog";

interface SlotCancelProps {
  isOpen: boolean;
  onClose: () => void;
  specificSlotId: string;
  slot?: { startTime: string; endTime: string };
  dayOfWeek: string;
}

export const CancelSlot = ({
  isOpen,
  onClose,
  specificSlotId,
  slot,
  dayOfWeek,
}: SlotCancelProps) => {
  const [cancelSlot] = useCancelSpecificSlotMutation();

  const handleConfirmCancel = async () => {
    return cancelSlot({ specificSlotId })
      .unwrap()
      .then(() => {
        toast.success("El turno fue cancelado correctamente");
        onClose();
      });
  };

  if (!isOpen) return null;
  const message = `¿Estás seguro de cancelar el turno del ${dayOfWeek} de ${slot?.startTime} a ${slot?.endTime} hs?`;
  return (
    <ConfirmDialog
      message={message}
      onConfirm={handleConfirmCancel}
      onCancel={onClose}
    ></ConfirmDialog>
  );
};
