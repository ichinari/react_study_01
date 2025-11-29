import React from "react";
import AppRoutes from "../routers/router";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Loading />
    </>
  );
}

export default App;
