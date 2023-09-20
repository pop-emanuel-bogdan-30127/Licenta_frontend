import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ReservationService from "../../../services/ReservationService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ListReservation() {
  const [reservation, setReservation] = React.useState([]);
  const [open, setOpen] = React.useState([false]);
  const [reservationId, setReservationId] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    getAllReservations();
  }, []);

  const getAllReservations = () => {
    ReservationService.getAllReservations()
      .then((response) => {
        setReservation(response.data);
        setOpen(false);
      })
      .catch((error) => {});
  };

  const deleteReservation = () => {
    ReservationService.deleteReservation(reservationId)
      .then((response) => {
        getAllReservations();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const reservationCreate = () => {
    history.push("/admin_add-reservation/_add");
  };

  const reservationUpdate = (id) => {
    history.push(`/admin_update-reservation/${id}`);
  };

  const back = () => {
    history.push("/admin");
  };

  const handleClickOpen = (id) => {
    setReservationId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setReservationId(null);
    setOpen(false);
  };

  return (
    <div>
      <br />
      <h2 className="text-center">Listă de Rezervări</h2>
      <div>
        <button className="btn btn-primary" onClick={() => reservationCreate()}>
          Adaugă Rezervare
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
              <th>Id Rezervare</th>
              <th>Nume Client</th>
              <th>Email Client </th>
              <th>Tel. Client</th>
              <th>Data Sosirii</th>
              <th>Data Plecării</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {reservation.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.telephone}</td>
                <td>{moment(reservation.checkIn).format("DD MM YYYY ")}</td>
                <td>{moment(reservation.checkOut).format("DD MM YYYY")}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => reservationUpdate(reservation.id)}
                  >
                    Actualizare
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-danger"
                    onClick={() => handleClickOpen(reservation.id)}
                  >
                    Șterge
                  </button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      {"Atenție! Acțiunea este ireversibilă!"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Sunteți sigur că doriți să ștergeți rezervarea cu id-ul:{" "}
                        {reservationId} definitiv?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <button
                        onClick={deleteReservation}
                        className="btn btn-danger"
                      >
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListReservation;
