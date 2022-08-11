import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Form/Form";
import Menu from "./components/Menu/Menu";
import Messages from "./components/Messages/Messages";

/// Routes

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Menu />
              <SignUp />
            </main>
          }
        ></Route>
        <Route path="/Messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
