import React from "react";
import "./App.css";
import Parra from "./components/parra.jsx";
import Mobile from "./components/mobile.jsx";

function App() {
  function UserGreeting(props) {
    if (window.innerWidth >= 1026) {
      return <Parra></Parra>;
    } else if (window.innerWidth <= 1026) {
      return <Mobile></Mobile>;
    }
  }
  return (
    <div>
      <UserGreeting></UserGreeting>
    </div>
  );
}

export default App;
