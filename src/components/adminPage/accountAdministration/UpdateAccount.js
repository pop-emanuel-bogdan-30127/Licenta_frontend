import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AccountService from "../../../services/AccountService";

function UpdateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    const newAccount = {
      username,
      email,
      password,
    };
    if (id) {
      AccountService.updateAccount(newAccount, id)
        .then((res) => {
          history.push("/admin_accounts");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  useEffect(() => {
    AccountService.findById(id)
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const cancel = () => {
    history.goBack();
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div
            className="card col-md-6 offset-md-3"
            style={{ backgroundColor: "#adc5e9" }}
          >
            <br />
            <h3 className="text-center">Actualizează contul</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label"> Nume utilizator:</label>
                  <input
                    type="text"
                    placeholder="caractere permise(a-z,A-Z, '_- ') max 15"
                    name="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    pattern="^([a-zA-Z0-9_](\s){0,1}){5,15}$"
                    maxLength={15}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Email: </label>
                  <input
                    type="text"
                    placeholder="adresa de email"
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
                    type="text"
                    placeholder="minim: 8 caractere, un numar, un caracter special"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="^(?=.*?[0-9])(?=.*?[#?!@$ %^&*]).{8,20}$"
                    maxLength={20}
                    required
                  ></input>
                </div>
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

export default UpdateAccount;
