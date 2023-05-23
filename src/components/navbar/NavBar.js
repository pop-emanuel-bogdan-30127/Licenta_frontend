import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  // const [button, setButton] = useState(true);
  //const [adminVerification, setAdminVerification] = useState(false);
  const [userVerification, setUserVerification] = useState(false);

  const [adminName, setAdminName] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();

  // const history = useHistory();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // const showButton = () => {
  //   if (window.innerWidth <= 960) {
  //     setButton(false);
  //   } else {
  //     setButton(true);
  //   }
  // };

  // useEffect(() => {
  //   showButton();
  // }, []);

  //window.addEventListener("resize", showButton);

  React.useEffect(() => {
    if (
      sessionStorage.getItem("admin_user") &&
      sessionStorage.getItem("admin_pass")
    ) {
      setAdminName(sessionStorage.getItem("admin_user"));
      setAdminPassword(sessionStorage.getItem("admin_pass"));
      // setAdminVerification(true);
    } else {
      //setAdminVerification(false);
    }
  }, [adminName, adminPassword]);

  React.useEffect(() => {
    if (
      sessionStorage.getItem("user_name") &&
      sessionStorage.getItem("user_pass")
    ) {
      setUserName(sessionStorage.getItem("user_name"));
      setUserPassword(sessionStorage.getItem("user_pass"));
      setUserVerification(true);
    } else {
      setUserVerification(false);
    }
    // console.log(userName);
    // console.log(userPassword);
    // console.log(adminName);
    // console.log(adminPassword);
  }, [userName, userPassword]);

  const adminLogout = () => {
    sessionStorage.removeItem("admin_user");
    sessionStorage.removeItem("admin_pass");
    window.location.replace("/");
  };

  const userLogout = () => {
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("user_pass");
    window.location.replace("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={require("../../icons/icons8-office-80.png")} alt="Logo" />
            Acasă
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Acasă
              </Link>
            </li>

            {userName && userPassword ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-links dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {sessionStorage.getItem("user_name")}
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li className="dropdown-item" href="#">
                    Editeaza detaliile contului
                  </li>
                  <li className="dropdown-item" href="#">
                    Vizualizeaza anunțurile
                  </li>
                  <li className="dropdown-item" onClick={userLogout}>
                    User Logout
                  </li>
                </ul>
              </li>
            ) : (
              <Link to="/user-login" className="nav-links">
                User Login
              </Link>
            )}
            <li className="nav-item">
              {adminName && adminPassword ? (
                <a className="btn btn-danger" onClick={adminLogout}>
                  Admin Logout
                </a>
              ) : (
                <Link to="/admin-login" className="nav-links">
                  Admin Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
