import axios from "axios";

const RESERVATION_API_BASE_URL = "http://localhost:8082/api/v1/reservation";

class ReservationService {
  getAllReservations() {
    return axios.get(RESERVATION_API_BASE_URL);
  }

  getById(reservationId) {
    return axios.get(RESERVATION_API_BASE_URL + "/" + reservationId);
  }

  getByOfficeId(officeId) {
    return axios.get(RESERVATION_API_BASE_URL + "/" + officeId + "/office");
  }

  saveReservation(officeId, reservation) {
    return axios.post(
      RESERVATION_API_BASE_URL + "/" + officeId + "/reservation",
      reservation
    );
  }

  deleteReservation(reservationId) {
    return axios.delete(RESERVATION_API_BASE_URL + "/" + reservationId);
  }

  updateReservation(reservationId, data) {
    return axios.patch(
      RESERVATION_API_BASE_URL + "/" + reservationId + "/modify",
      data
    );
  }
  getOfficeIdByReservationId(reservationId) {
    return axios.get(
      RESERVATION_API_BASE_URL + "/" + reservationId + "/officeByReservation"
    );
  }
  changeStatus(reservationId, status) {
    return axios.patch(
      RESERVATION_API_BASE_URL + "/" + reservationId + "/status",
      status
    );
  }
}

export default new ReservationService();
