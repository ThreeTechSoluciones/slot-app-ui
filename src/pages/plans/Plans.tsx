import "./Plans.css";
import { useEffect, useState, type FormEvent } from "react";
import {
  useGetUserPricesQuery,
  useUpdatePriceMutation,
} from "../../app/services/PriceService";
import toast from "react-hot-toast";
import useAuthentication from "../../hooks/useAuthentication";

function Plans() {
  const { userId } = useAuthentication();
  const { data: prices, refetch } = useGetUserPricesQuery(userId!);
  const [newAmount, setNewAmount] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState("");
  const [updatePrice, { isLoading: isUpdating }] = useUpdatePriceMutation();
  const selectedPrice = prices?.find((p) => p.id === selectedPriceId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPriceId) {
      toast.error("Por favor, selecciona un plan.");
      return;
    }
    if (!newAmount || isNaN(Number(newAmount))) {
      toast.error("Ingresa un monto válido.");
      return;
    }
    try {
      await updatePrice({
        priceId: selectedPriceId,
        amount: Number(newAmount),
      }).unwrap();
      toast.success("Precio actualizado con éxito");
      setNewAmount("");
      await refetch();
    } catch (err) {
      toast.error("Error al actualizar el precio");
      console.error(err);
    }
  };

  return (
    <div className="plansContainer">
      <div className="selectContainer">
        <label className="label" htmlFor="planSelect">
          Seleccionar un plan o frecuencia
        </label>
        <select
          id="planSelect"
          className="select"
          value={selectedPriceId}
          onChange={(e) => setSelectedPriceId(e.target.value)}
        >
          <option value="">-- Selecciona una opción --</option>
          {prices?.map((price) => (
            <option key={price.id} value={price.id}>
              {price.name}
            </option>
          ))}
        </select>
      </div>

      {selectedPrice && (
        <form className="amountsContainer" onSubmit={handleSubmit}>
          <div className="actualAmount">
            <label className="label">Monto Actual</label>
            <input
              className="input"
              readOnly
              value={`$${selectedPrice.amount}`}
            />
          </div>
          <div className="newAmount">
            <label className="label">Monto Nuevo</label>
            <input
              className="input"
              type="text"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              disabled={isUpdating}
              placeholder="0,00"
            />
          </div>
          <div className="submitContainer">
            <button
              type="submit"
              className="submitButton"
              disabled={isUpdating}
            >
              {isUpdating ? "Actualizando..." : "Registrar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Plans;
