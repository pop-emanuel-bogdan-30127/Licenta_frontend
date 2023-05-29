import React from "react";
import { useHistory } from "react-router-dom";
import OfficeService from "../../services/OfficeService";
import AccountService from "../../services/AccountService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MyOffices() {
  const [office, setOffice] = React.useState([]);
  const [open, setOpen] = React.useState([false]);
  const [addImage, setAddImage] = React.useState([false]);
  const [modifyImage, setModifyImage] = React.useState([false]);
  const [officeId, setOfficeId] = React.useState([]);
  const [accountId, setAccountId] = React.useState([]);
  const history = useHistory();

  const [image, setImage] = React.useState();

  const handleUploadImage = React.useCallback((data) => {
    data.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);

    OfficeService.uploadImageforOffice(officeId, formData).then(
      console.log("Upload succesful")
    );
    setImage();
  });

  React.useEffect(() => {
    AccountService.getAccountByUsername(sessionStorage.getItem("user_name"))
      .then((account) => {
        console.log("office => " + JSON.stringify(account));
        setAccountId(account.data.id);
      })
      .catch((error) => {
        console.error(error);
      });

    getAllOffices();
  }, [accountId]);

  const getAllOffices = () => {
    OfficeService.getAllOfficesByAccountId(accountId)
      .then((response) => {
        setOffice(response.data);
        setOpen(false);
        setAddImage(false);
        setModifyImage(false);
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
    history.push("/new-office/_add");
  };

  const handleClickOpen = (id) => {
    setOfficeId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOfficeId(null);
    setOpen(false);
  };

  const editOffice = (id) => {
    history.push(`/edit-office/${id}`);
  };

  const handleAddImage = (id) => {
    setOfficeId(id);
    setAddImage(true);
  };

  const handleCloseAddImage = () => {
    setOfficeId(null);
    setAddImage(false);
  };

  const handleModifyImage = (id) => {
    setOfficeId(id);
    setModifyImage(true);
  };

  const handleCloseModifyImage = () => {
    setOfficeId(null);
    setModifyImage(false);
  };

  return (
    <div>
      <div className="p-4 mb-4 rounded text-bg-dark">
        <div className="col-md-5 px-0">
          <h1 className="display-5 fst-italic">
            Aici vă puteți vizualiza și edita anunțurile
          </h1>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-9">
          {office.map((office) => (
            <div
              key={office.id}
              className="card row g-0 border rounded flex-md-row mb-4"
              style={{
                height: "fit-content",
                background: "#0F84B6",
                color: "#eceeef",
              }}
            >
              <div className="col p-4 d-flex flex-column position-static">
                <br />
                <h3 className="mb-0">{office.title}</h3>
                <br />
                <h5 className="mb-1 text-body-secondary">
                  <span
                    className="badge rounded-pill bg-warning me-2"
                    style={{ color: "black" }}
                  >
                    {office.price} lei
                  </span>
                  <span
                    className="badge rounded-pill bg-warning me-2"
                    style={{ color: "black" }}
                  >
                    {office.space} m² {}
                  </span>
                  <span
                    className="badge rounded-pill bg-warning me-2"
                    style={{ color: "black" }}
                  >
                    etaj {office.floor}
                  </span>
                </h5>
                <p className="card-text mb-auto">{office.description}</p>
                <br />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      className="btn btn-outline-light"
                      style={{ borderWidth: "3px", fontWeight: "bold" }}
                      onClick={() => editOffice(office.id)}
                    >
                      Editează
                    </button>
                    <button
                      style={{ borderWidth: "3px", fontWeight: "bold" }}
                      className="btn btn-outline-danger"
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
                          Sunteți sigur că doriți să ștergeți acest anunț
                          definitiv?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <button
                          onClick={deleteOffice}
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
                  </div>
                </div>
              </div>
              <div
                className="card flex-md-row position-static"
                style={{
                  width: "340px",
                  height: "inherit",
                  background: "#55595c",
                }}
              >
                {office.images ? (
                  <>
                    <img
                      className="card-img rounded-end"
                      style={{ objectFit: "cover", height: "248px" }}
                      src={require(`${"C:/Users/ux533fda8011 lot/Desktop/Aplicatie licenta/Application/backend/office-images/"}${
                        office.id
                      }${"/"}${office.images}`)}
                      data-holder-rendered="true"
                      onClick={() => handleModifyImage(office.id)}
                    />
                    <Dialog open={modifyImage} onClose={handleCloseModifyImage}>
                      <DialogTitle>
                        {"Modifică imaginea anunțului tău:"}
                      </DialogTitle>

                      <DialogActions>
                        <div className="form-group mb-2">
                          <label className="form-label">
                            Noua imagine de copertă
                          </label>
                          <input
                            type="file"
                            name="images"
                            className="form-control "
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                          ></input>
                          <br />

                          <button
                            onClick={handleUploadImage}
                            className="btn btn-primary me-2"
                          >
                            Confirmă
                          </button>
                          <button
                            onClick={handleCloseModifyImage}
                            autoFocus
                            className="btn btn-secondary"
                          >
                            Anulează
                          </button>
                        </div>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : (
                  <>
                    <img
                      alt="no images found"
                      className="card-img rounded-start"
                      style={{ objectFit: "cover", height: "248px" }}
                      src={require("C:/Users/ux533fda8011 lot/Desktop/Aplicatie licenta/Application/react-office-frontend/Licenta_frontend/src/images/no-images.jpg")}
                      data-holder-rendered="true"
                      onClick={() => handleAddImage(office.id)}
                    />
                    <Dialog open={addImage} onClose={handleCloseAddImage}>
                      <DialogTitle>
                        {"Adaugă o imagine anunțului tău:"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>Imagini</DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <div className="form-group mb-2">
                          <input
                            type="file"
                            name="images"
                            className="form-control "
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                          ></input>
                          <br />

                          <button
                            onClick={handleUploadImage}
                            className="btn btn-primary me-2"
                          >
                            Confirmă
                          </button>
                          <button
                            onClick={handleCloseAddImage}
                            autoFocus
                            className="btn btn-secondary"
                          >
                            Anulează
                          </button>
                        </div>
                      </DialogActions>
                    </Dialog>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOffices;
