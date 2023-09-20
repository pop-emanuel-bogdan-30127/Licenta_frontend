import React from "react";
import { useHistory } from "react-router-dom";
import AccountService from "../../../services/AccountService";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ListAccount() {
  const [account, setAccount] = React.useState([]);
  const [accountId, setAccountId] = React.useState([]);
  const [open, setOpen] = React.useState([false]);
  const history = useHistory();

  React.useEffect(() => {
    getAllAccounts();
  }, []);

  const getAllAccounts = () => {
    AccountService.findAllAccounts()
      .then((response) => {
        setAccount(response.data);
        setOpen(false);
      })
      .catch((error) => {});
  };

  const deleteAccount = () => {
    AccountService.deleteAccount(accountId)
      .then((response) => {
        getAllAccounts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const accountCreate = () => {
    history.push("/admin_add-account/_add");
  };

  const accountUpdate = (id) => {
    console.log(id);
    history.push(`/admin_update-account/${id}`);
  };

  const accountView = (id) => {
    history.push(`/admin_view-account/${id}`);
  };

  const back = () => {
    history.push("/admin");
  };

  const handleClickOpen = (id) => {
    setAccountId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setAccountId(null);
    setOpen(false);
  };

  return (
    <div>
      <br />
      <h2 className="text-center">Listă de Conturi</h2>
      <div>
        <button className="btn btn-primary" onClick={() => accountCreate()}>
          Adaugă Cont
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
              <th>Id Cont</th>
              <th>Nume utilizator</th>
              <th>Email </th>
              <th>Parolă </th>
              <th>Data înregistrării </th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {account.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.password}</td>
                <td>
                  {moment(account.enrollDate).format("DD MM YYYY hh:mm:ss")}
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => accountUpdate(account.id)}
                  >
                    Actualizare
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-danger"
                    onClick={() => handleClickOpen(account.id)}
                  >
                    Șterge
                  </button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      {"Atenție! Acțiunea este ireversibilă!"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Sunteți sigur că doriți să ștergeți contul cu id-ul:{" "}
                        {accountId}
                        definitiv?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <button
                        onClick={deleteAccount}
                        className="btn btn-danger"
                      >
                        Acceptă
                      </button>
                      <button onClick={handleClose} className="btn btn-primary">
                        Refuză
                      </button>
                    </DialogActions>
                  </Dialog>
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "10px" }}
                    onClick={() => accountView(account.id)}
                  >
                    Vizualizează
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

export default ListAccount;
