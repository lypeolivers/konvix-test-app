// src/App.tsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Client from "../pages/Client";
import Sale from "../pages/Sale";
import CustomHeader from "../components/Header";
import Report from "../pages/Report";
import ReportClient from "../pages/ReportClient";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

function RouterNavigation({ children }: any) {
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(token || "");
    console.log("AUTH: ", auth, token);
  }, []);

  return (
    <Router>
      <>
        <>
          {auth && auth != "" ? <CustomHeader /> : ""}

          <Routes>
            <Route
              path="/relatorio"
              element={
                auth && auth != "" ? <Report /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/relatorio-clientes"
              element={
                auth && auth != "" ? <ReportClient /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={
                auth && auth != "" ? <Client /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/vendas"
              element={auth && auth != "" ? <Sale /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={auth && auth != "" ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        </>
      </>
    </Router>
  );
}

export default RouterNavigation;
