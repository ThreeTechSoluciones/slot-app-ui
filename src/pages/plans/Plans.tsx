import "./Plans.css";
import { useState, type FormEvent } from "react";
import {
  useGetPriceByIdQuery,
  useUpdatePriceMutation,
} from "../../app/services/PriceService";
import toast from "react-hot-toast";

function Plans() {
  const [newAmount, setNewAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const { data: price, isFetching } = useGetPriceByIdQuery(selectedOption, {
    skip: !selectedOption,
  });

  const [updatePrice] = useUpdatePriceMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOption || !newAmount) {
      toast.error("Selecciona un plan y un nuevo monto");
      return;
    }

    try {
      await updatePrice({
        priceId: selectedOption,
        amount: Number(newAmount),
      }).unwrap();
      toast.success("Precio actualizado con éxito");
      setNewAmount("");
    } catch (error) {
      toast.error("Error al actualizar el precio");
      console.error(error);
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
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value=""></option>
          <option value="id-plan-1">1 Día</option>
          <option value="id-plan-2">2 Días</option>
          <option value="id-plan-3">3 Días</option>
          <option value="id-plan-4">4 Días</option>
          <option value="id-plan-clase">Clase</option>
        </select>
      </div>

      <form className="amountsContainer" onSubmit={handleSubmit}>
        <div className="actualAmount">
          <label className="label">Monto Actual</label>
          <input
            className="input"
            readOnly
            value={isFetching ? "Cargando..." : price ? `$${price.amount}` : ""}
          />
        </div>
        <div className="newAmount">
          <label className="label">Monto Nuevo</label>
          <input
            className="input"
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
        </div>
        <div className="submitContainer">
          <button type="submit" className="submitButton">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Plans;
