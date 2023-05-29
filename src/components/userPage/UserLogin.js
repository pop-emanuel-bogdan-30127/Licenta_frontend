import React from "react";
import axios from "axios";

function UserLogin() {
  const [errorMessages, setErrorMessages] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const errors = {
    username: "Acest username nu există",
    password: "parolă incorectă",
  };

  const backHome = (event) => {
    window.location.replace("/");
  };

  const newAccount = (event) => {
    window.location.replace("/new-account");
  };

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault();

    console.log(username);
    console.log(password);

    try {
      const object = await axios.get(
        `${"http://localhost:8082/api/v1/customer/username/"}${username}`
      );

      if (object.data) {
        if (object.data.password !== password) {
          setErrorMessages({ name: "password", message: errors.password });
        } else {
          sessionStorage.setItem("user_name", username);
          sessionStorage.setItem("user_pass", password);
          window.location.replace("/");
        }
      } else {
        setErrorMessages({ name: "username", message: errors.username });
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  });

  const passwordView = (id) => {
    const x = document.getElementById(id);
    console.log(document.getElementById(id));
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="container" style={{ maxwidth: "400px" }}>
        <div className="row">
          <div
            className="card col-md-4 offset-md-4"
            style={{ backgroundColor: "#adc5e9" }}
          >
            <br />
            <h3 className="text-center">Login</h3>
            <br />
            <div className="card-body">
              <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                  <div className="form-group mb-2">
                    <label className="form-label"> Nume utilizator:</label>
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    ></input>
                    {renderErrorMessage("username")}
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label"> Parolă:</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Parolă"
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    ></input>
                    {renderErrorMessage("password")}
                  </div>
                  <input
                    type="checkbox"
                    onClick={(e) => passwordView("password")}
                  />
                  arata parola
                  <br />
                  <br />
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "100px" }}
                    >
                      Login
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{
                        width: "100px",
                        float: "right",
                      }}
                      onClick={backHome}
                    >
                      Înapoi
                    </button>
                  </div>
                  {renderErrorMessage("username") && (
                    <>
                      <hr />
                      <div
                        className="mx-auto"
                        style={{ display: "block", width: "150px" }}
                      >
                        <button
                          className="btn btn-warning"
                          style={{
                            width: "150px",
                          }}
                          onClick={newAccount}
                        >
                          Crează cont nou
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
