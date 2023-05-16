import React from "react";

export default function Logout() {
  const logout = (event) => {
    sessionStorage.removeItem("admin_user");
    sessionStorage.removeItem("admin_pass");
    window.location.replace("http://localhost:3000");
  };
  return (
    <button
      className="btn btn-danger"
      style={{
        width: "100px",
        float: "right",
      }}
      onClick={logout}
    >
      Logout
    </button>
  );
}
