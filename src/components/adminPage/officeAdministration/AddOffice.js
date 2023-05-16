import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import OfficeService from "../../../services/OfficeService";
import AccountService from "../../../services/AccountService";
// import AsyncSelect from "react-select/async";
// import Select from "react-select/dist/declarations/src/Select";

function AddOffice() {
  const [title, setTitle] = useState();
  const [space, setSpace] = useState();
  const [price, setPrice] = useState();
  const [floor, setFloor] = useState();
  const [parking, setParking] = useState();
  const [year, setYear] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [telephone, setTelephone] = useState();
  const [city, setCity] = useState();
  const [account, setAccount] = useState();
  const [accountId, setAccountId] = useState();
  const history = useHistory();

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    const office = {
      title,
      space,
      price,
      floor,
      parking,
      year,
      address,
      city,
      telephone,
      description,
      accountId,
    };

    OfficeService.saveOfficeByAccountID(office, accountId)
      .then((res) => {
        console.log("office => " + JSON.stringify(office));
        history.push("/admin_offices");
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const cancel = () => {
    history.push("/admin_offices");
  };

  React.useEffect(() => {
    getAllAccounts();
    console.log(accountId);
  }, []);

  const getAllAccounts = () => {
    AccountService.findAllAccounts()
      .then((response) => {
        setAccount(response.data);
        console.log("account => " + JSON.stringify(response.data));
      })
      .catch((error) => {});
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
            <h3 className="text-center">Adaugă anunț</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {account && (
                  <div className="form-group mb-2">
                    <label className="form-label">
                      {" "}
                      Contul corespunzător anunțului:
                    </label>

                    <select
                      value={accountId}
                      onChange={(e) => {
                        setAccountId(e.target.value);
                        console.log(e.target.value);
                      }}
                      className="form-select"
                      name="account_field"
                      required
                    >
                      <option selected value="">
                        Niciun cont selectat
                      </option>
                      {account.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.username}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group mb-2">
                  <label className="form-label"> Titlu:</label>
                  <input
                    type="text"
                    placeholder="Titlu max 60 caractere"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={60}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Preț (lei):</label>
                  <input
                    type="number"
                    placeholder="max 9999.99"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    // pattern="([0-9]){1,4}(\.([0-9]){1,2}){0,1}"
                    step={0.01}
                    max={9999.99}
                    maxLength={7}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Suprafață (m²):</label>
                  <input
                    type="number"
                    placeholder="max 999.99"
                    name="space"
                    className="form-control"
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                    // pattern="([0-9]){1,3}(\.([0-9]){1,2}){0,1}"
                    step={0.01}
                    max={999.99}
                    maxLength={6}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Localitate:</label>
                  <input
                    type="text"
                    placeholder="Oraș"
                    name="city"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    pattern="^(([a-zA-Z]){2,15}\s){0,5}((([a-zA-Z]){2,15}){1})$"
                    maxLength={30}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Adresă:</label>
                  <input
                    type="text"
                    placeholder="ex: str.Anghel Saligny, nr.14"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    pattern="^(str\.((\s){0,1}([a-zA-Z-]){2,15}){1,5}(,){0,1}(\s){1}nr\.(\s){0,1}([0-9]){1,4})$"
                    maxLength={50}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Etaj:</label>
                  <input
                    type="number"
                    placeholder="max 10"
                    name="floor"
                    className="form-control"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    min={0}
                    max={10}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Anul Construcției:</label>
                  <input
                    type="number"
                    placeholder="ex: 2010"
                    name="year_of_constructor"
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    min={1950}
                    max={2023}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Contact:</label>
                  <input
                    type="tel"
                    placeholder="numar de telefon"
                    name="telephone"
                    className="form-control"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    pattern="^[0-9]{10}$"
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Descriere: (opțional)</label>
                  <input
                    type="text"
                    placeholder="Descriere..."
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={500}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Nr. locuri de parcare:</label>
                  <input
                    type="number"
                    step={1}
                    placeholder="max 500 caractere"
                    name="parkingSpots"
                    className="form-control"
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                    min={0}
                    max={500}
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

export default AddOffice;
