import axios from "axios";

const OFFICE_API_BASE_URL = "http://localhost:8082/api/v1/offices";

class OfficeService {
  findAllOffice() {
    return axios.get(OFFICE_API_BASE_URL);
  }
  saveOffice(office) {
    return axios.post(OFFICE_API_BASE_URL, office);
  }
  findById(officeId) {
    return axios.get(OFFICE_API_BASE_URL + "/" + officeId);
  }
  updateOffice(office, officeId) {
    return axios.put(OFFICE_API_BASE_URL + "/" + officeId, office);
  }

  deleteOffice(officeId) {
    return axios.delete(OFFICE_API_BASE_URL + "/" + officeId);
  }
  saveOfficeByAccountID(office, accountId) {
    return axios.post(
      OFFICE_API_BASE_URL + "/" + accountId + "/offices",
      office
    );
  }
  getAllOfficesByAccountId(accountId) {
    return axios.get(OFFICE_API_BASE_URL + "/" + accountId + "/offices");
  }
  deleteOfficesByAccountId(accountId) {
    return axios.delete(OFFICE_API_BASE_URL + "/" + accountId + "/offices");
  }
  findOfficeAccountIdByOfficeId(officeId) {
    return axios.get(OFFICE_API_BASE_URL + "/" + officeId + "/account");
  }
}

export default new OfficeService();
