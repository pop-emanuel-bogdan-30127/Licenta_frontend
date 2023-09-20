import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { filter } from "lodash";
import moment from "moment";
import ReservationService from "../../services/ReservationService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ViewOfficeReservations() {
  const [reservation, setReservation] = React.useState([]);
  const [open, setOpen] = React.useState([false]);
  const [reservationId, setReservationId] = React.useState();
  const history = useHistory();
  const [statusFilter, setStatusFilter] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    getAllReservations();
  }, []);

  const getAllReservations = () => {
    ReservationService.getByOfficeId(id)
      .then((response) => {
        setReservation(filter(response.data, (o) => o.status === true));
        setOpen(false);
      })
      .catch((error) => {});
  };

  const reservationUpdate = (id) => {
    history.push(`/edit-reservations/${id}`);
  };

  const back = () => {
    history.goBack();
  };

  const handleClickOpen = (id) => {
    setReservationId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setReservationId(null);
    setOpen(false);
  };

  const changeFilter = async (e) => {
    ReservationService.getByOfficeId(id)
      .then((response) => {
        setReservation(response.data);
        setOpen(false);
      })
      .catch((error) => {});

    if (statusFilter === true) {
      setStatusFilter(false);
      await ReservationService.getByOfficeId(id)
        .then((response) => {
          setReservation(filter(response.data, (o) => o.status === false));
          setOpen(false);
        })
        .catch((error) => {});
    } else {
      setStatusFilter(true);
      await ReservationService.getByOfficeId(id)
        .then((response) => {
          setReservation(filter(response.data, (o) => o.status === true));
          setOpen(false);
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <br />
      <h2 className="text-center">Listă de Rezervări</h2>
      <div>
        {statusFilter ? (
          <button className="btn btn-info" onClick={() => changeFilter()}>
            Active
          </button>
        ) : (
          <button
            className="btn btn-info"
            style={{
              marginLeft: "10px",
              maxWidth: "100px",
            }}
            onClick={() => changeFilter()}
          >
            Inactive
          </button>
        )}

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
                <td>{moment(reservation.checkOut).format("DD MM YYYY ")}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => reservationUpdate(reservation.id)}
                  >
                    Actualizare
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

export default ViewOfficeReservations;
