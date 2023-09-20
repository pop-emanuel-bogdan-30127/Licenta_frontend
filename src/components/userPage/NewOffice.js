import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment/moment";
//import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import OfficeService from "../../services/OfficeService";
import AccountService from "../../services/AccountService";

function NewOffice() {
  const [title, setTitle] = useState();
  const [space, setSpace] = useState();
  const [price, setPrice] = useState();
  const [floor, setFloor] = useState();
  const [parking, setParking] = useState();
  const [year, setYear] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [telephone, setTelephone] = useState();
  // const [city, setCity] = useState();
  const [accountId, setAccountId] = useState();
  const [isOpenAvailableFrom, setIsOpenAvailableFrom] = useState(false);
  const [isOpenAvailableTo, setIsOpenAvailableTo] = useState(false);
  const [availableFrom, setAvailableFrom] = useState();
  const [availableTo, setAvailableTo] = useState();
  ///////////
  //const [image, setImage] = useState();
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
      // city,
      telephone,
      description,
      accountId,
      availableFrom,
      availableTo,
    };

    ////////////
    // const imageFile = new FormData();
    // imageFile.append("image", image);
    // console.log(imageFile);

    // OfficeService.saveOfficeWithImage(accountId, office, imageFile)
    OfficeService.saveOfficeByAccountID(accountId, office)
      .then((res) => {
        //console.log("office => " + JSON.stringify(office));
        history.push("/my-offices");
      })
      .catch((error) => {
        console.error(error);
        console.error("Something went wrong");
      });
  });

  const cancel = () => {
    history.goBack();
  };

  React.useEffect(() => {
    getAccount();
    //console.log(image);
  }, []);

  const getAccount = () => {
    AccountService.getAccountByUsername(sessionStorage.getItem("user_name"))
      .then((response) => {
        setAccountId(response.data.id);
        //console.log(response.data.id);
      })
      .catch((error) => {});
  };

  const handleChangeAvailableFrom = (e) => {
    setIsOpenAvailableFrom(!isOpenAvailableFrom);
    setAvailableFrom(e);
    setAvailableTo(e);
  };
  const handleClickAvailableFrom = (e) => {
    e.preventDefault();
    setIsOpenAvailableFrom(!isOpenAvailableFrom);
  };

  const handleChangeAvailableTo = (e) => {
    setIsOpenAvailableTo(!isOpenAvailableTo);
    setAvailableTo(e);
  };
  const handleClickAvailableTo = (e) => {
    e.preventDefault();
    setIsOpenAvailableTo(!isOpenAvailableTo);
  };

  const filterPassedDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    return currentDate < selectedDate;
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
            <h3 className="text-center">Adaugă anunț</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                {/* <div className="form-group mb-2">
                  <label className="form-label"> Imagini:</label>
                  <input
                    type="file"
                    name="images"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  ></input>
                </div> */}
                <div className="form-group mb-2">
                  <label className="form-label"> Preț (lei):</label>
                  <input
                    type="number"
                    placeholder="max 9999.99"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                    step={0.01}
                    max={999.99}
                    maxLength={6}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Disponibil din:</label>
                  <br />
                  <button
                    className="btn btn-primary"
                    style={{
                      width: "140px",
                      height: "30px",
                      textAlign: "center",
                      fontSize: "20px",
                      lineHeight: "18px",
                    }}
                    onClick={handleClickAvailableFrom}
                  >
                    {moment(availableFrom).format("DD-MM-yyyy")}
                  </button>
                  {isOpenAvailableFrom && (
                    <DatePicker
                      selected={availableFrom}
                      onChange={(date) => handleChangeAvailableFrom(date)}
                      filterDate={filterPassedDate}
                      dateFormat={"dd-MM-yyyy"}
                      required
                      inline
                    />
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Până în:</label>
                  <br />
                  <button
                    className="btn btn-primary"
                    style={{
                      width: "140px",
                      height: "30px",
                      textAlign: "center",
                      fontSize: "20px",
                      lineHeight: "18px",
                    }}
                    onClick={handleClickAvailableTo}
                  >
                    {moment(availableTo).format("DD-MM-yyyy")}
                  </button>

                  {isOpenAvailableTo && (
                    <DatePicker
                      selected={availableTo}
                      onChange={(date) => handleChangeAvailableTo(date)}
                      filterDate={filterPassedDate}
                      dateFormat={"dd-MM-yyyy"}
                      required
                      inline
                    />
                  )}
                </div>
                {/* <div className="form-group mb-2">
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
                </div> */}
                <div className="form-group mb-2">
                  <label className="form-label"> Adresă:</label>
                  <input
                    type="text"
                    placeholder="ex: str.Anghel Saligny, nr.14"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    pattern="^(str\.((\s){0,1}([a-zA-Z]){2,15}){1,5}(,){0,1}(\s){1}nr\.(\s){0,1}([0-9]){1,4})$"
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
                  <textarea
                    type="text"
                    placeholder="Descriere..."
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={500}
                  ></textarea>
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

export default NewOffice;
