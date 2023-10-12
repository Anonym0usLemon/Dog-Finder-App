import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Homepage from "./components/Search/Search";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import AuthContext from "./context/auth-context";

function App() {
  return (
    <>
      <Header />
      <main className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Homepage />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
