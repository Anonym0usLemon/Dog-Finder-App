import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage"
import PrivateRoutes from "./components/utils/PrivateRoutes";
import DogDetails from "./components/DogDetails/DogDetails";
import { useState } from "react";

function App() {
  return (
    <>
      <main className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/dog-details/:id" element={<DogDetails />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
