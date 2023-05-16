import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AccountService from "../../../services/AccountService";

function AddAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    const account = {
      username,
      email,
      password,
    };

    AccountService.saveAccount(account)
      .then((res) => {
        console.log("account => " + JSON.stringify(account));
        history.push("/admin_accounts");
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const cancel = () => {
    history.push("/admin_accounts");
  };
  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div
            className="card col-md-6 offset-md-3 offset-md-3"
            style={{ backgroundColor: "#adc5e9" }}
          >
            <br />
            <h3 className="text-center">Adaugă cont</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label"> Nume utilizator:</label>

                  <input
                    type="text"
                    title="minim 5 caracter, maxim 20. Caractere speciale perminse: -_"
                    placeholder={username}
                    name="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    pattern="^([a-zA-Z0-9_-](\s){0,1}){5,20}$"
                    maxLength={20}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Email: </label>
                  <input
                    type="text"
                    placeholder={email}
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="^([a-zA-Z0-9.]){2,15}@([a-zA-Z0-9]){1,10}(\.)([a-zA-Z0-9]){1,10}$"
                    maxLength={30}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Parolă:</label>
                  <input
                    title="minim 8 caractere, minim o cifra, minim un caracter special"
                    type="password"
                    placeholder={password}
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$"
                    maxLength={20}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2"></div>
                <button type="submit" className="btn btn-success">
                  Salvează
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => cancel(e)}
                  style={{ marginLeft: "10px" }}
                >
                  Anulează
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAccount;
