import "./Plans.css";
import { useState } from "react";
import { useGetUserPricesQuery } from "../../app/services/UserService";
import { useUpdatePriceMutation } from "../../app/services/PriceService";
import toast from "react-hot-toast";
import useAuthentication from "../../hooks/useAuthentication";
import { formatCurrency } from "../../utils/Formatter";

function Plans() {
  const { userId } = useAuthentication();
  const { data: prices } = useGetUserPricesQuery(userId!);
  const [newAmount, setNewAmount] = useState<number>(0);
  const [selectedPriceId, setSelectedPriceId] = useState("");
  const [updatePrice, { isLoading: isUpdating }] = useUpdatePriceMutation();
  const selectedPrice = prices?.find((p) => p.id === selectedPriceId);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    setNewAmount(Number(rawValue) / 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPriceId) {
      toast.error("Por favor, selecciona un plan.");
      return;
    }

    if (!newAmount || isNaN(Number(newAmount))) {
      toast.error("Ingresa un monto válido.");
      return;
    }

    updatePrice({
      priceId: selectedPriceId,
      amount: Number(newAmount),
    })
      .unwrap()
      .then(() => {
        toast.success("Precio actualizado con éxito");
        setNewAmount(0);
      });
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
          <option value="">- Selecciona una opción -</option>
          {prices &&
            prices.map((price) => (
              <option key={price.id} value={price.id}>
                {price.name}
              </option>
            ))}
        </select>
      </div>

      <form className="amountsContainer" onSubmit={handleSubmit}>
        <div className="actualAmount">
          <label className="label">Monto Actual</label>
          <input
            className="input"
            type="text"
            readOnly
            value={formatCurrency(selectedPrice?.amount ?? 0)}
          />
        </div>
        <div className="newAmount">
          <label className="label">Monto Nuevo</label>
          <input
            className="input"
            type="text"
            value={formatCurrency(newAmount)}
            onChange={handleAmountChange}
            disabled={isUpdating}
            placeholder="0,00"
          />
        </div>
        <div className="submitContainer">
          <button type="submit" className="submitButton" disabled={isUpdating}>
            {isUpdating ? "Actualizando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Plans;
