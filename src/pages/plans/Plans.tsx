import "./Plans.css";
import { useState, type FormEvent } from "react";

function Plans() {
  const [newAmount, setNewAmount] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Nuevo monto registrado: $${newAmount}`);
    setNewAmount("");
  };
  const [selectedOption, setSelectedOption] = useState("");
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
          <option value="1day">1 Día</option>
          <option value="2days">2 Días</option>
          <option value="3days">3 Días</option>
          <option value="4days">4 Días</option>
          <option value="class">Clase</option>
        </select>
      </div>

      <form className="amountsContainer" onSubmit={handleSubmit}>
        <div className="actualAmount">
          <label className="label">Monto Actual</label>
          <input className="input" readOnly value="$20.500" />
        </div>
        <div className="newAmount">
          <label className="label">Monto Nuevo</label>
          <input
            className="input"
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
