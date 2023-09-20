import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import OfficeService from "../../services/OfficeService";
import AccountService from "../../services/AccountService";
import moment from "moment";

function CustomerViewOffice() {
  const [title, setTitle] = useState("");
  const [space, setSpace] = useState("");
  const [price, setPrice] = useState("");
  const [floor, setFloor] = useState("");
  const [parking, setParking] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [description, setDescription] = useState("");
  const [telephone, setTelephone] = useState("");
  const [username, setUsername] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const back = () => {
    history.goBack();
  };

  React.useEffect(() => {
    OfficeService.findById(id)
      .then((res) => {
        //console.log("office => " + JSON.stringify(res.data));
        setTitle(res.data.title);
        setSpace(res.data.space);
        setPrice(res.data.price);
        setFloor(res.data.floor);
        setParking(res.data.parking);
        setYear(res.data.year);
        setAddress(res.data.address);
        setDescription(res.data.description);
        setTelephone(res.data.telephone);
        setCreationDate(res.data.creationDate);
        OfficeService.findOfficeAccountIdByOfficeId(id).then((result) => {
          setUsername(result.data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const reservationCreate = () => {
    history.push(`/new-reservation/${id}`);
  };

  return (
    <div>
      <br></br>
      <div
        className="card col-md-6 offset-md-3"
        style={{ backgroundColor: "#adc5e9" }}
      >
        <br />
        <h3 className="text-center"> Vizualizează informațiile </h3>
        <h3 className="text-center"> anunțului</h3>
        <div className="card-body">
          <div className="row">
            <label> Proprietar anunț: </label>
            <div> {username}</div>
          </div>
          <hr />
          <div className="row">
            <label> Titlu anunț: </label>
            <div> {title}</div>
          </div>
          <hr />
          <div className="row">
            <label> Preț: </label>
            <div> {price} (lei/lună)</div>
          </div>
          <hr />
          <div className="row">
            <label> Adresă: </label>
            <div> {address}</div>
          </div>
          <hr />
          <div className="row">
            <label> Suprafață: </label>
            <div> {space} (m²)</div>
          </div>
          <hr />
          <div className="row">
            <label> Etaj: </label>
            <div> {floor}</div>
          </div>
          <hr />
          <div className="row">
            <label> Contact: </label>
            <div> {telephone}</div>
          </div>
          <hr />
          <div className="row">
            <label> Descriere: </label>
            <div> {description}</div>
          </div>
          <hr />
          <div className="row">
            <label> Număr locuri de parcare: </label>
            <div> {parking}</div>
          </div>
          <hr />
          <div className="row">
            <label> Anul construcției: </label>
            <div> {year}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-10">
              <button
                className="btn btn-primary col"
                style={{
                  //marginLeft: "10px",
                  maxWidth: "140px",
                }}
                onClick={(e) => reservationCreate(e)}
              >
                Rezervă acum
              </button>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-danger col"
                onClick={(e) => back(e)}
                style={{
                  marginLeft: "10px",
                  maxWidth: "100px",
                }}
              >
                Înapoi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerViewOffice;
