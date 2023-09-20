import "./App.css";
import React from "react";
import { Route, Switch, BrowserRouter, Router } from "react-router-dom"; // Routes = Switch
import "react-datepicker/dist/react-datepicker.css";
import HomeComponent from "./components/mainPage/HomeComponent";
import ListOffice from "./components/adminPage/officeAdministration/ListOffice";
import AddOffice from "./components/adminPage/officeAdministration/AddOffice";
import ViewOffice from "./components/adminPage/officeAdministration/ViewOffice";
import UpdateOffice from "./components/adminPage/officeAdministration/UpdateOffice";
import AdminLogin from "./components/adminPage/AdminLogin";
import NavBar from "./components/navbar/NavBar";
import AdminApp from "./components/adminPage/AdminApp";
import AdminHome from "./components/adminPage/AdminHome";
import Logout from "./components/adminPage/Logout";
import ListAccount from "./components/adminPage/accountAdministration/ListAccount";
import AddAccount from "./components/adminPage/accountAdministration/AddAccount";
import UpdateAccount from "./components/adminPage/accountAdministration/UpdateAccount";
import ViewAccount from "./components/adminPage/accountAdministration/ViewAccount";
import UserLogin from "./components/userPage/UserLogin";
import ImageUpload from "./components/adminPage/officeAdministration/ImageUpload";
import NewAccount from "./components/userPage/NewAccount";
import EditAccount from "./components/userPage/EditAccount";
import MyOffices from "./components/userPage/MyOffices";
import EditOffice from "./components/userPage/EditOffice";
import NewOffice from "./components/userPage/NewOffice";
import ListReservation from "./components/adminPage/reservationAdmin/ListReservation";
import AddReservation from "./components/adminPage/reservationAdmin/AddReservation";
import AddReservationForOffice from "./components/adminPage/reservationAdmin/AddReservationForOffice";
import UpdateReservation from "./components/adminPage/reservationAdmin/UpdateReservation";
import ListReservationsByOffice from "./components/adminPage/reservationAdmin/ListReservationsByOffice";
import ViewOfficeReservations from "./components/userPage/ViewOfficeReservations";
import EditReservation from "./components/userPage/EditReservation";
import CustomerViewOffice from "./components/mainPage/CustomertViewOffice";
import CustomerReservation from "./components/mainPage/CustomerReservation";

function App() {
  const [verification, setVerification] = React.useState(false);

  const [userVerification, setUserVerification] = React.useState(false);
  const [userPassword, setUserPassword] = React.useState();
  const [userName, setUserName] = React.useState();

  React.useEffect(() => {
    if (
      sessionStorage.getItem("admin_user") &&
      sessionStorage.getItem("admin_pass")
    ) {
      setVerification(true);
    } else {
      setVerification(false);
    }
    // console.log(" verified status:" + verification);
    // console.log(sessionStorage.getItem("admin_user"));
    // console.log(sessionStorage.getItem("admin_pass"));
  }, [
    sessionStorage.getItem("admin_user"),
    sessionStorage.getItem("admin_pass"),
  ]);

  React.useEffect(() => {
    if (
      sessionStorage.getItem("user_name") &&
      sessionStorage.getItem("user_pass")
    ) {
      setUserName(sessionStorage.getItem("user_name"));
      setUserPassword(sessionStorage.getItem("user_pass"));
      setUserVerification(true);
    } else {
      setUserVerification(false);
    }
  }, [userName, userPassword]);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid container-page">
          <div className="container">
            <Switch>
              <Route path="/" exact component={HomeComponent} />
              <Route
                path="/admin"
                component={verification ? AdminHome : HomeComponent}
              />
              <Route
                path="/admin_offices"
                component={verification ? ListOffice : HomeComponent}
              />
              <Route
                path="/admin_add-office/:id"
                component={verification ? AddOffice : HomeComponent}
              />
              <Route
                path="/admin_view-office/:id"
                component={verification ? ViewOffice : HomeComponent}
              />
              <Route
                path="/admin_update-office/:id"
                component={verification ? UpdateOffice : HomeComponent}
              />
              <Route
                path="/admin_accounts"
                component={verification ? ListAccount : HomeComponent}
              />
              <Route
                path="/admin_add-account/:id"
                component={verification ? AddAccount : HomeComponent}
              />
              <Route
                path="/admin_update-account/:id"
                component={verification ? UpdateAccount : HomeComponent}
              />
              <Route
                path="/admin_view-account/:id"
                component={verification ? ViewAccount : HomeComponent}
              />
              <Route
                path="/admin_reservations"
                component={verification ? ListReservation : HomeComponent}
              />
              <Route
                path="/office-reservations/:id"
                component={
                  verification ? ListReservationsByOffice : HomeComponent
                }
              />
              <Route
                path="/admin_add-reservation/:id"
                component={verification ? AddReservation : HomeComponent}
              />
              <Route
                path="/admin_add-reservation_for_office/:id"
                component={
                  verification ? AddReservationForOffice : HomeComponent
                }
              />
              <Route
                path="/admin_update-reservation/:id"
                component={verification ? UpdateReservation : HomeComponent}
              />
              <Route path="/admin-login" component={AdminLogin} />
              <Route path="/user-login" component={UserLogin} />
              <Route path="/new-account" component={NewAccount} />
              <Route
                path="/edit-account"
                component={userVerification ? EditAccount : HomeComponent}
              />
              <Route
                path="/my-offices"
                component={userVerification ? MyOffices : HomeComponent}
              />
              <Route
                path="/edit-office/:id"
                component={userVerification ? EditOffice : HomeComponent}
              />
              <Route
                path="/new-office"
                component={userVerification ? NewOffice : HomeComponent}
              />
              <Route
                path="/view-reservations/:id"
                component={
                  userVerification ? ViewOfficeReservations : HomeComponent
                }
              />
              <Route
                path="/edit-reservations/:id"
                component={userVerification ? EditReservation : HomeComponent}
              />
              \
              <Route
                path="/view-office_details/:id"
                component={CustomerViewOffice}
              />
              <Route
                path="/new-reservation/:id"
                component={CustomerReservation}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
