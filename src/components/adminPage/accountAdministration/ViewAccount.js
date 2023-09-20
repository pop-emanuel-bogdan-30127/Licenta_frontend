import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AccountService from "../../../services/AccountService";
import moment from "moment/moment";

function ViewAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enrollDate, setEnrollDate] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const back = () => {
    history.goBack();
  };

  React.useEffect(() => {
    AccountService.findById(id)
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setEnrollDate(res.data.enrollDate);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <br></br>
      <div
        className="card col-md-4 offset-md-4"
        style={{ backgroundColor: "#adc5e9" }}
      >
        <br />
        <h3 className="text-center"> Vizualizează informațiile </h3>
        <h3 className="text-center"> contului</h3>

        <div className="card-body">
          <div className="row">
            <label> Nume utilizator: </label>
            <div> {username}</div>
          </div>
          <hr />
          <div className="row">
            <label> Email: </label>
            <div> {email} </div>
          </div>
          <hr />
          <div className="row">
            <label> Parolă: </label>
            <div> {password}</div>
          </div>
          <hr />
          <div className="row">
            <label> Data înregistrării contului: </label>
            <div> {moment(enrollDate).format("DD MM YYYY hh:mm:ss")}</div>
          </div>
        </div>
        <button
          className="btn btn-danger"
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
  );
}

export default ViewAccount;
