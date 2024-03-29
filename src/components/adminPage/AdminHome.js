import React from "react";
import { useHistory } from "react-router-dom";

export default function AdminHome() {
  const history = useHistory();

  const officeAdmin = () => {
    history.push("/admin_offices");
  };
  const accountAdmin = () => {
    history.push("/admin_accounts");
  };
  const reservationAdmin = () => {
    history.push("/admin_reservations");
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => accountAdmin()}>
        Conturi
      </button>
      <button
        style={{ marginLeft: "20px" }}
        className="btn btn-primary"
        onClick={() => officeAdmin()}
      >
        Anunțuri
      </button>

      <button
        style={{ marginLeft: "20px" }}
        className="btn btn-primary"
        onClick={() => reservationAdmin()}
      >
        Rezervări
      </button>
      <h2> Bine ai venit {sessionStorage.getItem("admin_user")}!</h2>
    </div>
  );
}
