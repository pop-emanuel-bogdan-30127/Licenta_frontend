import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AccountService from "../../services/AccountService";

function NewAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState();
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const history = useHistory();

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();

    const account = {
      username,
      email,
      password,
    };

    if (passwordConfirmation === password) {
      try {
        const obiect = await AccountService.getAccountByUsername(
          account.username
        );

        if (obiect.data) {
          setError(true);
          setErrorUsername(
            username + " este deja folosit. Vă rugăm alegeți alt nume"
          );
        } else {
          AccountService.saveAccount(account)
            .then((res) => {
              setError(false);
              history.push("/admin_accounts");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } catch (error) {
        console.error("Something went wrong!");
      }
    } else {
      setErrorPassword("Confirmarea trebuie sa coincida cu parola");
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

  const cancel = () => {
    history.push("/");
  };
  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div
            className="card col-md-4 offset-md-4"
            style={{ backgroundColor: "#adc5e9" }}
          >
            <br />
            <h3 className="text-center">Crează cont</h3>
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
                    pattern="^([a-zA-Z0-9_](\s){0,1}){5,20}$"
                    maxLength={20}
                    required
                  ></input>
                  {error && (
                    <div class="alert alert-danger" role="alert">
                      {errorUsername}
                    </div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Email: </label>
                  <input
                    type="text"
                    title="exemplu email: nume.prenume@domeniu.extensie"
                    placeholder={email}
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="^([a-zA-Z0-9.]){2,15}@(([a-zA-Z0-9]){1,10}(\.)){1,3}([a-zA-Z0-9]){1,10}$"
                    maxLength={30}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Parolă:</label>
                  <input
                    id="password"
                    title="minim 8 caractere, minim o cifra, minim un caracter special"
                    type="password"
                    placeholder={password}
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_=+]).{8,20}$"
                    maxLength={20}
                    required
                  ></input>
                  <input
                    type="checkbox"
                    onClick={(e) => passwordView("password")}
                  />
                  arata parola
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Confiormarea parolei:</label>
                  <input
                    id="confirmation"
                    title="Must match the Password field"
                    type="password"
                    placeholder={passwordConfirmation}
                    name="password"
                    className="form-control"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    pattern="^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_=+]).{8,20}$"
                    maxLength={20}
                    required
                  ></input>
                  <input
                    type="checkbox"
                    onClick={(e) => passwordView("confirmation")}
                  />
                  {errorPassword}
                </div>
                <div className="form-group mb-2"></div>
                <button type="submit" className="btn btn-primary">
                  Salvează
                </button>
                <button
                  className="btn btn-warning"
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

export default NewAccount;
