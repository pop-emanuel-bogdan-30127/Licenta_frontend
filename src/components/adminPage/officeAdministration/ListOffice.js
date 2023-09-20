import React from "react";
import { useHistory } from "react-router-dom";
import OfficeService from "../../../services/OfficeService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ListOffice() {
  const [office, setOffice] = React.useState([]);
  const [open, setOpen] = React.useState([false]);
  const [officeId, setOfficeId] = React.useState([]);
  // const [username, setUsername] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    getAllOffices();
  }, []);

  const getAllOffices = () => {
    OfficeService.findAllOffice()
      .then((response) => {
        setOffice(response.data);
        setOpen(false);
      })
      .catch((error) => {});
  };

  const deleteOffice = () => {
    OfficeService.deleteOffice(officeId)
      .then((response) => {
        getAllOffices();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const officeCreate = () => {
    history.push("/admin_add-office/_add");
  };

  const officeUpdate = (id) => {
    history.push(`/admin_update-office/${id}`);
  };

  const officeView = (id) => {
    history.push(`/admin_view-office/${id}`);
  };

  const reservationsList = (id) => {
    history.push(`/office-reservations/${id}`);
  };

  const back = () => {
    history.push("/admin");
  };

  const handleClickOpen = (id) => {
    setOfficeId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOfficeId(null);
    setOpen(false);
  };

  // const getUsername = (id) => {
  //   OfficeService.findOfficeAccountIdByOfficeId(id).then((res) => {
  //     console.log(res.data);
  //     setUsername(res.data);
  //   });
  // };

  return (
    <div>
      <br />
      <h2 className="text-center">Listă de Anunțuri</h2>
      <div>
        <button className="btn btn-primary" onClick={() => officeCreate()}>
          Adaugă Birou
        </button>
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
      <br></br>
      <div className="row">
        <table className="table table-bordered table-striped table-warning">
          <thead>
            <tr>
              <th>Id Birou</th>
              {/* <th>Proprietar</th> */}
              <th style={{ width: "380px" }}>Titlu anunț</th>
              <th>Preț Birou </th>
              <th>Suprafață</th>
              <th>Adresă</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {office.map((office) => (
              <tr key={office.id}>
                <td>{office.id}</td>
                {/* <td>
                  {getUsername(office.id)}
                  {username}
                </td> */}
                {/* {console.log(office.id)} */}
                <td>{office.title}</td>
                <td>{office.price} lei</td>
                <td>{office.space} m²</td>
                <td>{office.address}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => officeUpdate(office.id)}
                  >
                    Actualizare
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-danger"
                    onClick={() => handleClickOpen(office.id)}
                  >
                    Șterge
                  </button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      {"Atenție! Acțiunea este ireversibilă!"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Sunteți sigur că doriți să ștergeți anunțul cu id-ul:{" "}
                        {officeId} definitiv?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <button onClick={deleteOffice} className="btn btn-danger">
                        Acceptă
                      </button>
                      <button
                        onClick={handleClose}
                        autoFocus
                        className="btn btn-primary"
                      >
                        Refuză
                      </button>
                    </DialogActions>
                  </Dialog>
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "10px" }}
                    onClick={() => officeView(office.id)}
                  >
                    Vizualizează
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => reservationsList(office.id)}
                  >
                    Rezervări
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOffice;
