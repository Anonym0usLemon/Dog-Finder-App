import Login from "./components/Login/Login"
import "./App.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header/>
      <div className="App">
        <Login/>
      </div>
    </>
  );
}

export default App;
