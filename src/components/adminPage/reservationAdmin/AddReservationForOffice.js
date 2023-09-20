import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import "advance-javascript";
import ReservationService from "../../../services/ReservationService";
import OfficeService from "../../../services/OfficeService";

function AddReservationForOffice() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [reservationDate, setReservationDate] = useState();
  const [availableFrom, setAvailableFrom] = useState();
  const [availableTo, setAvailableTo] = useState();
  const [officeId, setOfficeId] = useState();
  const [officeTitle, setOfficeTitle] = useState();
  const [status, setStatus] = useState(true);
  const [isOpenCheckIn, setIsOpenCheckIn] = useState(false);
  const [isOpenCheckOut, setIsOpenCheckOut] = useState(false);
  const [dateError, setDateError] = useState(false);

  const { id } = useParams();
  const history = useHistory();
  const [disabledDateRanges, setDisabledDateRanges] = React.useState([]);

  const handleChangeCheckIn = (e) => {
    setIsOpenCheckIn(!isOpenCheckIn);
    setCheckIn(e);
    setCheckOut(e);
  };
  const handleClickCheckIn = (e) => {
    e.preventDefault();
    setIsOpenCheckIn(!isOpenCheckIn);
  };

  const handleChangeCheckOut = (e) => {
    setIsOpenCheckOut(!isOpenCheckOut);
    setCheckOut(e);
  };
  const handleClickCheckOut = (e) => {
    e.preventDefault();
    setIsOpenCheckOut(!isOpenCheckOut);
  };

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();

    const reservation = {
      name,
      email,
      telephone,
      checkIn,
      checkOut,
      officeId,
      status,
    };

    ReservationService.saveReservation(officeId, reservation)
      .then((res) => {
        if (res.data === "success") {
          setDateError(false);
          history.goBack();
        }
        if (res.data === "overlap") {
          setDateError(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const cancel = () => {
    history.goBack();
  };

  React.useEffect(() => {
    getAllOffices();
    isBeforeDate();
  }, []);

  const getAllOffices = () => {
    OfficeService.findById(id)
      .then((offices) => {
        setOfficeId(offices.data.id);
        setOfficeTitle(offices.data.title);
      })
      .catch((error) => {});
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterCheckInDate = (date) => {
    const currentDate = new Date().addDays(-1);
    const selectedDate = new Date(date);

    if (availableFrom !== undefined && availableTo !== undefined) {
      return (
        selectedDate > currentDate &&
        selectedDate < availableTo &&
        selectedDate > availableFrom
      );
    }
    return selectedDate > currentDate;
  };

  const filterCheckOutDate = (date) => {
    const currentDate = new Date().addDays(-1);
    const selectedDate = new Date(date);

    if (availableFrom !== undefined && availableTo !== undefined) {
      if (checkIn) {
        return (
          selectedDate > currentDate &&
          selectedDate < availableTo &&
          selectedDate > availableFrom &&
          selectedDate > checkIn
        );
      } else {
        return (
          selectedDate > currentDate &&
          selectedDate < availableTo &&
          selectedDate > availableFrom
        );
      }
    }
    return selectedDate > currentDate;
  };

  const isBeforeDate = async () => {
    await ReservationService.getByOfficeId(id)
      .then((response) => {
        setReservationDate(response.data);
        disabledDateRanges.length = 0;
        if (response) {
          response.data.map((reservation) => {
            // if (reservation.status)
            disabledDateRanges.push({
              start: new Date(reservation.checkIn),
              end: new Date(reservation.checkOut),
            });
          });
        }
      })
      .catch((error) => {});

    await OfficeService.findById(id)
      .then((res) => {
        setAvailableFrom(new Date(res.data.availableFrom));
        setAvailableTo(new Date(res.data.availableTo));
      })
      .catch((error) => {});
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
            <h3 className="text-center">Adaugă rezervare</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    Biroul corespunzător rezervării:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={officeTitle}
                    readOnly
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Nume:</label>
                  <input
                    type="text"
                    placeholder="Nume max 20 caractere"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    pattern="(([a-zA-Z0-9_\s]){5,20})"
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
                    pattern="^([a-zA-Z0-9.]){2,15}@(([a-zA-Z0-9]){1,10}(\.)){1,3}([a-zA-Z0-9]){1,10}$"
                    maxLength={30}
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
                  {dateError && (
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Interval invalid!</strong> Asiguă-te că nu ai
                      încorporat un interval ocupat.
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  )}
                  <label className="form-label"> Data sosirii:</label>
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
                    onClick={handleClickCheckIn}
                  >
                    {moment(checkIn).format("DD-MM-yyyy")}
                  </button>

                  {isOpenCheckIn && (
                    <DatePicker
                      selected={checkIn}
                      onChange={(e) => handleChangeCheckIn(e)}
                      excludeDateIntervals={disabledDateRanges}
                      filterTime={filterPassedTime}
                      filterDate={filterCheckInDate}
                      dateFormat={"DD-MM-yyyy"}
                      required
                      inline
                    />
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Data Plecării:</label>
                  {dateError && (
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Interval invalid!</strong> Asiguă-te că nu ai
                      încorporat un interval ocupat.
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  )}
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
                    onClick={handleClickCheckOut}
                  >
                    {moment(checkOut).format("DD-MM-yyyy")}
                  </button>

                  {isOpenCheckOut && (
                    <DatePicker
                      //className="form-control"
                      selected={checkOut}
                      onChange={(e) => handleChangeCheckOut(e)}
                      excludeDateIntervals={disabledDateRanges}
                      filterTime={filterPassedTime}
                      filterDate={filterCheckOutDate}
                      dateFormat={"DD-MM-yyyy "}
                      required
                      inline
                    />
                  )}
                </div>
                <br />

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

export default AddReservationForOffice;
