import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  return (
    <div>
      <br />
      <h2 className="text-center">Lista de Anunturi</h2>
      <div></div>
    </div>
  );
}

export default Home;
