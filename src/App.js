import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage"
import PrivateRoutes from "./components/utils/PrivateRoutes";
import DogDetails from "./components/DogDetails/DogDetails";
import { useState } from "react";

function App() {
  const [matchTrigger, setMatchTrigger] = useState(false);

  function matchHandler() {
    setMatchTrigger(true)
  }

  function resetMatchHandler() {
    setMatchTrigger(false);
  }

  return (
    <>
      <main className="App">
        <BrowserRouter>
          <Header match={matchHandler}/>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="https://anonym0uslemon.github.io/fetch-fe-challenge/Home" element={<Homepage matchTrigger={matchTrigger} resetMatch={resetMatchHandler}/>} />
              <Route path="https://anonym0uslemon.github.io/fetch-fe-challenge/dog-details/:id" element={<DogDetails />} />
            </Route>
            <Route path="https://anonym0uslemon.github.io/fetch-fe-challenge" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
