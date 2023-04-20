import "./App.css";
import { Navbar, Toast } from "./components";
import { Routers } from "./router/router";

function App() {

  return (
    <div className="App">
      <Toast/>
      <Navbar/>
      <Routers/>
    </div>
  );
}

export default App;
