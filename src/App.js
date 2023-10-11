import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Homepage from "./components/Search/Search";
import NoPage from "./components/NoPage/NoPage";

function App() {
  return (
    <>
      <Header />
      <main className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Homepage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
