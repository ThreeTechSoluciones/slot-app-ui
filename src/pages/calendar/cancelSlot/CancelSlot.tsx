import { toast } from "react-hot-toast";
import { useCancelSpecificSlotMutation } from "../../../app/services/SpecificSlotService";
import { ConfirmDialog } from "../../../components/confirm_dialog/ConfirmDialog";

interface SlotCancelProps {
  isOpen: boolean;
  onClose: () => void;
  specificSlotId: string;
}

export const CancelSlot = ({
  isOpen,
  onClose,
  specificSlotId,
}: SlotCancelProps) => {
  const [cancelSlot, { isLoading }] = useCancelSpecificSlotMutation();

  const handleConfirmCancel = async () => {
    return cancelSlot({ specificSlotId })
      .unwrap()
      .then(() => {
        toast.success("El turno fue cancelado correctamente");
        onClose();
      });
  };

  if (!isOpen) return null;

  return (
    <ConfirmDialog
      message="¿Estás seguro de cancelar el turno?"
      onConfirm={handleConfirmCancel}
      onCancel={onClose}
    ></ConfirmDialog>
  );
};
