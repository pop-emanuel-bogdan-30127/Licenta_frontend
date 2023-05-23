import React from "react";
import axios from "axios";

function UserLogin() {
  const [errorMessages, setErrorMessages] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const errors = {
    username: "username incorect",
    password: "parolă incorectă",
  };

  const backHome = (event) => {
    window.location.replace("/");
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
            className="card col-md-6 offset-md-3"
            style={{ backgroundColor: "#adc5e9" }}
          >
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
