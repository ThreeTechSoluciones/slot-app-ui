import "./Plans.css";

function Plans() {
  return (
    <div className="plansContainer">
      <div className="amountsContainer">
        <div className="actualAmount">
          <label className="label">Monto Actual</label>
          <input className="input" readOnly />
        </div>
        <div className="newAmount">
          <label className="label">Nuevo Monto</label>

          <input className="input" />
        </div>
      </div>
    </div>
  );
}

export default Plans;
