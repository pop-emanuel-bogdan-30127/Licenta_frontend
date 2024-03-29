import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [userVerification, setUserVerification] = useState(false);

  const [adminName, setAdminName] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("admin_user") &&
      sessionStorage.getItem("admin_pass")
    ) {
      setAdminName(sessionStorage.getItem("admin_user"));
      setAdminPassword(sessionStorage.getItem("admin_pass"));
      // setAdminVerification(true);
    } else {
      // setAdminVerification(false);
    }

    if (
      sessionStorage.getItem("user_name") &&
      sessionStorage.getItem("user_pass")
    ) {
      setUserName(sessionStorage.getItem("user_name"));
      setUserPassword(sessionStorage.getItem("user_pass"));
    } else {
    }
  }, [adminName, adminPassword]);

  const userLogout = (event) => {
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("user_pass");
    window.location.replace("http://localhost:3000");
  };

  const adminLogout = (event) => {
    sessionStorage.removeItem("admin_user");
    sessionStorage.removeItem("admin_pass");
    window.location.replace("http://localhost:3000");
  };

  const newAccount = (event) => {
    window.location.replace("/new-account");
  };

  return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                src={require("../../icons/icons8-office-80.png")}
                alt="Logo"
                width="60"
                height="60"
              />
              Acasă
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>

            <div>
              {userName && userPassword ? (
                <>
                  <button
                    className="btn btn-primary me-3 dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {sessionStorage.getItem("user_name")}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <Link className="dropdown-item" to="/edit-account">
                      Editează detaliile contului
                    </Link>
                    <Link className="dropdown-item" to="/my-offices">
                      Vizualizează anunțurile
                    </Link>
                    <Link className="dropdown-item" to="/new-office">
                      Adaugă un anunț
                    </Link>
                    <li className="dropdown-item" onClick={userLogout}>
                      Deconectează-te
                    </li>
                  </ul>
                </>
              ) : (
                <Link
                  to="/user-login"
                  className="btn btn-outline-primary me-3"
                  style={{ color: "white" }}
                >
                  Intră în cont
                </Link>
              )}
            </div>
            <button className="btn btn-warning me-3" onClick={newAccount}>
              Cont nou
            </button>
            <div>
              {adminName && adminPassword ? (
                <>
                  <button
                    className="btn btn-primary me-3 dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {sessionStorage.getItem("admin_user")}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <Link className="dropdown-item" to="/admin_accounts">
                      Conturi utilizatori
                    </Link>
                    <Link className="dropdown-item" to="/admin_offices">
                      Anunturi
                    </Link>
                    <Link className="dropdown-item" to="/admin_reservations">
                      Rezervări
                    </Link>
                    <li className="btn btn-danger me-3" onClick={adminLogout}>
                      Deconectează-te
                    </li>
                  </ul>
                </>
              ) : (
                <Link
                  to="/admin-login"
                  className="btn btn-outline-danger me-3"
                  style={{ color: "white" }}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
