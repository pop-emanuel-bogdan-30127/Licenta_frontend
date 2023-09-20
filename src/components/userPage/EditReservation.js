import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import ReservationService from "../../services/ReservationService";
import OfficeService from "../../services/OfficeService";

function EditReservation() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [creation, setCreation] = useState();
  const [status, setStatus] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [availableFrom, setAvailableFrom] = useState();
  const [availableTo, setAvailableTo] = useState();
  const [isOpenCheckIn, setIsOpenCheckIn] = useState(false);
  const [isOpenCheckOut, setIsOpenCheckOut] = useState(false);
  const [officeId, setOfficeId] = useState();
  const [disabledDateRanges, setDisabledDateRasnges] = React.useState([]);

  const history = useHistory();
  const { id } = useParams();

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

    if (id) {
      const dataCheck = new FormData();
      dataCheck.append("checkIn", checkIn);
      dataCheck.append("checkOut", checkOut);
      ReservationService.updateReservation(id, dataCheck)
        .then((res) => {
          history.goBack();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  useEffect(() => {
    ReservationService.getById(id)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setTelephone(res.data.telephone);
        setStatus(res.data.status);
        setCreation(res.data.creation);
        setCheckIn(new Date(res.data.checkIn));
        setCheckOut(new Date(res.data.checkOut));
      })
      .catch((error) => {
        console.error(error);
      });
    ReservationService.getOfficeIdByReservationId(id)
      .then((officeId) => {
        setOfficeId(officeId.data);
        isBeforeDate(officeId.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const cancel = () => {
    history.goBack();
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

  const isBeforeDate = async (officeId) => {
    await ReservationService.getByOfficeId(officeId)
      .then((response) => {
        if (response) {
          response.data.map((reservation) => {
            if (parseInt(reservation.id) !== parseInt(id)) {
              disabledDateRanges.push({
                start: new Date(reservation.checkIn),
                end: new Date(reservation.checkOut),
              });
            }
          });
        }
      })
      .catch((error) => {});

    await OfficeService.findById(officeId)
      .then((res) => {
        setAvailableFrom(new Date(res.data.availableFrom));
        setAvailableTo(new Date(res.data.availableTo));
      })
      .catch((error) => {});
  };
  const handelChangeStatus = () => {
    if (status === true) {
      setStatus(!status);
      const formData = new FormData();
      formData.append("status", false);
      ReservationService.changeStatus(id, formData);
    } else {
      setStatus(!status);
      const formData = new FormData();
      formData.append("status", !status);
      ReservationService.changeStatus(id, formData);
    }
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
            <h3 className="text-center">Actualizează anunț</h3>
            <div className="card-body">
              <div className="form-group mb-2">
                <label className="form-label"> Status rezervare:</label>
                {status ? (
                  <>
                    <br />
                    <button
                      className="btn btn-success"
                      style={{
                        width: "140px",
                        height: "30px",
                        textAlign: "center",
                        fontSize: "20px",
                        lineHeight: "18px",
                      }}
                      onClick={handelChangeStatus}
                    >
                      Activată
                    </button>
                  </>
                ) : (
                  <>
                    <br />
                    <button
                      className="btn btn-danger"
                      style={{
                        width: "140px",
                        height: "30px",
                        textAlign: "center",
                        fontSize: "20px",
                        lineHeight: "18px",
                      }}
                      onClick={handelChangeStatus}
                    >
                      Dezactivată
                    </button>
                  </>
                )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <label> Nume client: </label>
                  <div> {name}</div>
                </div>
                <hr />
                <div className="row">
                  <label> Email: </label>
                  <div> {email}</div>
                </div>
                <hr />
                <div className="row">
                  <label> Telefon: </label>
                  <div> {telephone} </div>
                </div>
                <hr />
                <div className="row">
                  <label> Data creării rezervării: </label>
                  <div> {moment(creation).format("DD-MM-yyyy HH:mm:ss")} </div>
                </div>
                <hr />

                <div className="form-group mb-2">
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
                    //onClick={handleClickCheckIn}
                  >
                    {moment(checkIn).format("DD-MM-yyyy")}
                  </button>

                  {/* {isOpenCheckIn && (
                    <DatePicker
                      selected={checkIn}
                      onChange={handleChangeCheckIn}
                      excludeDateIntervals={disabledDateRanges}
                      filterTime={filterPassedTime}
                      filterDate={filterCheckInDate}
                      dateFormat={"dd-MM-yyyy"}
                      required
                      inline
                    />
                  )} */}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Data plecării:</label>
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
                    //onClick={handleClickCheckOut}
                  >
                    {moment(checkOut).format("DD-MM-yyyy")}
                  </button>

                  {/* {isOpenCheckOut && (
                    <DatePicker
                      className="form-control"
                      selected={checkOut}
                      onChange={handleChangeCheckOut}
                      excludeDateIntervals={disabledDateRanges}
                      filterTime={filterPassedTime}
                      filterDate={filterCheckOutDate}
                      dateFormat={"dd-MM-yyyy"}
                      required
                      inline
                    />
                  )} */}
                </div>
                <button type="submit" className="btn btn-success">
                  Salvează
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => cancel()}
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

export default EditReservation;
