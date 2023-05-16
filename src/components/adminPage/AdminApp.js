// import React from "react";
// import { Route, Switch, BrowserRouter } from "react-router-dom"; // Routes = Switch
// import ListOffice from "./officeAdministration/ListOffice";
// import AddOffice from "./officeAdministration/AddOffice";
// import ViewOffice from "./officeAdministration/ViewOffice";
// import UpdateOffice from "./officeAdministration/UpdateOffice";
// import axios from "axios";
// import Home from "../mainPage/Home";
// import AdminHome from "./AdminHome";

// function AdminApp() {
//   const [verification, setVerification] = React.useState();

//   const credentialsVerification = React.useCallback(async () => {
//     const username = sessionStorage.getItem("admin_user");
//     const password = sessionStorage.getItem("admin_pass");
//     try {
//       console.log("entered try");
//       const object = await axios.get(
//         `${"http://localhost:8082/api/v1/admin/"}${username}`
//       );

//       if (
//         object.data &&
//         object.data.password === password &&
//         object.data.username === username
//       ) {
//         setVerification(true);
//         console.log(verification);
//       } else {
//         setVerification(false);
//         console.log(verification);
//       }
//     } catch (error) {
//       console.error("Something went wrong");
//     }
//   }, [verification]);

//   React.useEffect(() => {
//     credentialsVerification();
//     console.log(" verified status:" + verification);
//   }, [credentialsVerification]);

//   const backHome = (event) => {
//     sessionStorage.removeItem("admin_user");
//     sessionStorage.removeItem("admin_pass");
//     window.location.replace("http://localhost:3000");
//   };

//   return (
//     <div>
//       {verification ? (
//         <BrowserRouter>
//           <div className="container">
//             <button
//               className="btn btn-danger"
//               style={{
//                 width: "100px",
//                 float: "right",
//               }}
//               onClick={backHome}
//             >
//               Logout
//             </button>
//             <Switch>
//               <Route
//                 path="/admin"
//                 ={verification ? AdminHome : Home}
//               />
//               <Route
//                 path="/admin_offices"
//                 ={verification ? ListOffice : Home}
//               />
//               <Route
//                 path="/admin_add-office/:id"
//                 ={verification ? AddOffice : Home}
//               />
//               <Route
//                 path="/admin_view-office/:id"
//                 ={verification ? ViewOffice : Home}
//               />
//               <Route
//                 path="/admin_update-office/:id"
//                 ={verification ? UpdateOffice : Home}
//               />
//             </Switch>
//           </div>
//         </BrowserRouter>
//       ) : (
//         <div>
//           <h1 style={{ color: "red", textAlign: "center" }}> Access denied!</h1>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminApp;
