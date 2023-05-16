import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const adminLogin = () => {
    history.push("/login");
  };

  return (
    <div>
      <br />
      <h2 className="text-center">Lista de Anunturi</h2>
      <div>
        <button className="btn btn-primary" onClick={() => adminLogin()}>
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default Home;
