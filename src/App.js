import "./App.css";
import React from "react";
import { Route, Switch, BrowserRouter, Router } from "react-router-dom"; // Routes = Switch
import HomeComponent from "./components/mainPage/HomeComponent";
import ListOffice from "./components/adminPage/officeAdministration/ListOffice";
import AddOffice from "./components/adminPage/officeAdministration/AddOffice";
import ViewOffice from "./components/adminPage/officeAdministration/ViewOffice";
import UpdateOffice from "./components/adminPage/officeAdministration/UpdateOffice";
import AdminLogin from "./components/adminPage/AdminLogin";
import NavBar from "./components/navbar/NavBar";
import AdminHome from "./components/adminPage/AdminHome";
import ListAccount from "./components/adminPage/accountAdministration/ListAccount";
import AddAccount from "./components/adminPage/accountAdministration/AddAccount";
import UpdateAccount from "./components/adminPage/accountAdministration/UpdateAccount";
import ViewAccount from "./components/adminPage/accountAdministration/ViewAccount";
import UserLogin from "./components/userPage/UserLogin";
import ImageUpload from "./components/adminPage/officeAdministration/ImageUpload";

function App() {
  const [verification, setVerification] = React.useState(false);
  const [adminName, setAdminName] = React.useState();
  const [adminPassword, setAdminPassword] = React.useState();

  React.useEffect(() => {
    if (
      sessionStorage.getItem("admin_user") &&
      sessionStorage.getItem("admin_pass")
    ) {
      setAdminName(sessionStorage.getItem("admin_user"));
      setAdminPassword(sessionStorage.getItem("admin_pass"));
      setVerification(true);
    } else {
      setVerification(false);
    }
  }, [adminName, adminPassword]);

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
              <Route path="/admin-login" component={AdminLogin} />
              <Route path="/user-login" component={UserLogin} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
