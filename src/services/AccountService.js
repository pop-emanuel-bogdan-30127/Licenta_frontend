import axios from "axios";

const CUSTOMER_ACCOUNT_API_BASE_URL = "http://localhost:8082/api/v1/customer";

class CustomerService {
  findAllAccounts() {
    return axios.get(CUSTOMER_ACCOUNT_API_BASE_URL);
  }
  saveAccount(account) {
    return axios.post(CUSTOMER_ACCOUNT_API_BASE_URL, account);
  }
  findById(accountId) {
    return axios.get(CUSTOMER_ACCOUNT_API_BASE_URL + "/getById-" + accountId);
  }
  updateAccount(account, accountId) {
    return axios.put(CUSTOMER_ACCOUNT_API_BASE_URL + "/" + accountId, account);
  }
  deleteAccount(accountId) {
    return axios.delete(CUSTOMER_ACCOUNT_API_BASE_URL + "/" + accountId);
  }
  getAccountByUsername(username) {
    return axios.get(CUSTOMER_ACCOUNT_API_BASE_URL + "/username/" + username);
  }
  getAccountByEmail(email) {
    return axios.get(CUSTOMER_ACCOUNT_API_BASE_URL + "/email/" + email);
  }
}

export default new CustomerService();
