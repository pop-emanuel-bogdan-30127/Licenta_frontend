import React from "react";
import { useHistory } from "react-router-dom";
import OfficeService from "../../services/OfficeService";
import AccountService from "../../services/AccountService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function HomeComponent() {
  const [office, setOffice] = React.useState([]);
  const [officeId, setOfficeId] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    getAllOffices();
  }, []);

  const getAllOffices = () => {
    OfficeService.findAllOffice()
      .then((response) => {
        setOffice(response.data);
      })
      .catch((error) => {});
  };

  return (
    <div>
      <br />
      <h2 className="text-center">Lista de Anunturi</h2>
      <div>
        <div className="p-4 mb-4 rounded text-bg-dark">
          <div className="col-md-5 px-0">
            <h1 className="display-5 fst-italic">
              Aici vă puteți vizualiza și edita anunțurile
            </h1>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {office.map((office) => (
            <div className="col">
              <div
                key={office.id}
                className="card row g-0 border rounded flex-md-row mb-4"
                style={{
                  height: "fit-content",
                  background: "#0F84B6",
                  color: "#eceeef",
                }}
              >
                <div
                  className="card flex-md-row position-static"
                  style={{
                    width: "415px",
                    height: "inherit",
                    background: "#55595c",
                  }}
                >
                  {office.images ? (
                    <img
                      className="card-img rounded-end"
                      style={{ objectFit: "cover", height: "248px" }}
                      src={require(`${"C:/Users/ux533fda8011 lot/Desktop/Aplicatie licenta/Application/backend/office-images/"}${
                        office.id
                      }${"/"}${office.images}`)}
                      data-holder-rendered="true"
                    />
                  ) : (
                    <img
                      alt="no images found"
                      className="card-img rounded-start"
                      style={{ objectFit: "cover", height: "248px" }}
                      src={require("C:/Users/ux533fda8011 lot/Desktop/Aplicatie licenta/Application/react-office-frontend/Licenta_frontend/src/images/no-images.jpg")}
                      data-holder-rendered="true"
                    />
                  )}
                  <div className="card-img-overlay">
                    <h4>
                      <span
                        className="badge rounded-pill bg-warning me-2"
                        style={{ color: "black" }}
                      >
                        {office.price} lei/zi
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="col p-4 d-flex flex-column position-static">
                  <h3 className="mb-0">{office.title}</h3>
                  <br />
                  <h5 className="mb-1 text-body-secondary">
                    <span
                      className="badge rounded-pill bg-warning me-2"
                      style={{ color: "black" }}
                    >
                      {office.city}
                    </span>
                    <span
                      className="badge rounded-pill bg-warning me-2"
                      style={{ color: "black" }}
                    >
                      {office.address}
                    </span>
                  </h5>
                  <br />
                  <h5>
                    <span
                      className="badge rounded-pill bg-warning me-2"
                      style={{ color: "black" }}
                    >
                      {office.space} m² {}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
