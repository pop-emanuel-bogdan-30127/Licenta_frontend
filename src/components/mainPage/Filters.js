import React from "react";
import { sortBy, filter } from "lodash";
import OfficeService from "../../services/OfficeService";

function Filters({ office }) {
  const [showFilters, setShowFilters] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState();
  const [maxPrice, setMaxPrice] = React.useState();
  const [minSpace, setMinSpace] = React.useState();
  const [maxSpace, setMaxSpace] = React.useState();

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinSpace("");
    setMaxSpace("");
    getAllOffices();
  };

  const getAllOffices = () => {
    OfficeService.findAllOffice()
      .then((response) => {
        office = response.data;
      })
      .catch((error) => {});
  };

  const filtersButton = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  };

  const handleSubmit = () => {
    if (minPrice) {
      office = filter(office, (o) => o.price >= minPrice);
    }
    if (maxPrice) {
      office = filter(office, (o) => o.price <= maxPrice);
    }
    if (minSpace) {
      office = filter(office, (o) => o.space >= minSpace);
    }
    if (maxSpace) {
      office = filter(office, (o) => o.space <= maxSpace);
    }
  };

  return (
    <div className="Auth-form">
      {showFilters ? (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label"> Tarif lei/zi:</label>
            </div>
            <div className="col-md-2">
              <label className="form-label"> Spatiu m²:</label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <input
                type="number"
                name="minPrice"
                className="form-control"
                value={minPrice}
                placeholder="de la"
                onChange={(e) => setMinPrice(e.target.value)}
                maxLength={4}
                step={1}
                max={9999}
                min={0}
              ></input>
            </div>
            <div className="col-lg-2">
              <input
                type="number"
                name="maxPrice"
                className="form-control"
                value={maxPrice}
                placeholder="pana la"
                onChange={(e) => setMaxPrice(e.target.value)}
                maxLength={3}
                step={1}
                max={9999}
                min={0}
              ></input>
            </div>
            <div className="col-lg-2">
              <input
                type="number"
                name="minSpace"
                className="form-control"
                value={minSpace}
                placeholder="de la"
                onChange={(e) => setMinSpace(e.target.value)}
                maxLength={3}
                step={1}
                max={999}
                min={0}
              ></input>
            </div>
            <div className="col-lg-2">
              <input
                type="number"
                name="maxSpace"
                className="form-control"
                value={maxSpace}
                placeholder="pana la"
                onChange={(e) => setMaxSpace(e.target.value)}
                maxLength={3}
                step={1}
                max={999}
                min={0}
              ></input>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">
              <button
                className="btn btn-success"
                style={{
                  borderWidth: "3px",
                  fontWeight: "bold",
                  color: "black",
                }}
                onClick={handleSubmit}
              >
                Aplică Filtre
              </button>
            </div>

            <div className="col-sm-2">
              <button
                className="btn btn-danger"
                style={{
                  borderWidth: "3px",
                  fontWeight: "bold",
                  color: "black",
                }}
                onClick={resetFilters}
              >
                Resetează Filtre
              </button>
            </div>
            <div className="col-sm-2">
              <button
                className="btn btn-primary"
                style={{
                  borderWidth: "3px",
                  fontWeight: "bold",
                  color: "black",
                }}
                onClick={filtersButton}
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-success"
          style={{
            borderWidth: "3px",
            fontWeight: "bold",
            color: "black",
          }}
          onClick={filtersButton}
        >
          Arată Filtre
        </button>
      )}
    </div>
  );
}

export default Filters;
