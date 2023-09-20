import React from "react";
import { useHistory } from "react-router-dom";
import OfficeService from "../../services/OfficeService";
import { sortBy, filter } from "lodash";
import "./Pagination.css";

function HomeComponent() {
  const [office, setOffice] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(9999);
  const [minSpace, setMinSpace] = React.useState(0);
  const [maxSpace, setMaxSpace] = React.useState(999);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setPostPerPage] = React.useState(6);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const [showFilters, setShowFilters] = React.useState(false);
  const history = useHistory();

  const [sort, setSort] = React.useState({
    sortKey: "NONE",
    isReverse: false,
  });

  const SORTS = {
    NONE: (office) => office,
    PRICE: (office) => sortBy(office, "price").reverse(),
    SPACE: (office) => sortBy(office, "space").reverse(),
    PARKING: (office) => sortBy(office, "parking").reverse(),
    RPRICE: (office) => sortBy(office, "price"),
    RSPACE: (office) => sortBy(office, "space"),
    RPARKING: (office) => sortBy(office, "parking"),
  };

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  let pages = [];
  for (let i = 1; i <= Math.ceil(office.length / postPerPage); i++) {
    pages.push(i);
  }

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(office).reverse()
    : sortFunction(office);
  const currentPosts = sortedList.slice(firstPostIndex, lastPostIndex);

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

  const handleSubmit = () => {
    if (maxPrice && maxSpace) {
      setOffice(
        filter(
          office,
          (o) =>
            o.price >= minPrice &&
            o.price <= maxPrice &&
            o.space >= minSpace &&
            o.space <= maxSpace
        )
      );
    }
  };

  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(9999);
    setMinSpace(0);
    setMaxSpace(999);
    getAllOffices();
  };

  const filtersButton = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  };

  const redirect = (id) => {
    history.push(`/view-office_details/${id}`);
  };

  return (
    <div>
      <br />
      <div>
        <div className="p-4 mb-4 rounded text-bg-dark">
          <div className="col-md-5 px-0">
            <h1 className="display-5 fst-italic">
              Bun venit pe pagina noastră!
            </h1>
          </div>
        </div>
        <hr />

        <div>
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
                      required
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
                      required
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
                      required
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
                      required
                    ></input>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-2">
                    <button
                      className="btn btn-success"
                      style={{
                        // type: "submit",
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

          <div className="row">
            <label className="form-label"> Sortează după:</label>
            <div className="col-lg-3" style={{ width: "250px" }}>
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="form-select"
              >
                <option selected value=""></option>
                <option value="PRICE">Preț (lei) &#8650; descrescător</option>
                <option value="RPRICE">Preț (lei) &#8648; crescător</option>
                <option value="SPACE">Spațiu (mp) &#8650; descrescător</option>
                <option value="RSPACE">Spațiu (mp) &#8648;crescător</option>
                <option value="PARKING">
                  Număr locrui de parcare &#8650; descrescător
                </option>
                <option value="RPARKING">
                  Număr locrui de parcare &#8648; crescător
                </option>
              </select>
            </div>
          </div>
          <br />
          <hr />
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {currentPosts.map((office) => (
              <div className="col">
                <div
                  key={office.id}
                  className="card card_main row g-0 border rounded flex-md-row mb-4"
                  style={{
                    height: "fit-content",
                    background: "#0F84B6",
                    color: "#eceeef",
                  }}
                  onClick={() => redirect(office.id)}
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
                        alt="the main room"
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

          <div style={{ display: "flex", justifyContent: "center" }}>
            {pages.map((page, index) => {
              return (
                <button
                  className={
                    page === currentPage
                      ? "pagination_button_active"
                      : "pagination_button"
                  }
                  key={index}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
