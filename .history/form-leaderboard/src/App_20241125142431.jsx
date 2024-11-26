import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Aether Forms</h1>
        <form>
          <input
            type="checkbox"
            id="form1"
            name="form1"
            value="disability form"
          />
          <label for="form1">Disability Form</label>
          <br />

          <input
            type="checkbox"
            id="form3"
            name="form3"
            value="death form"
          />
          <label for="form3">Death Form</label>
          <br/>
          <input
            type="checkbox"
            id="form1"
            name="form1"
            value="disability form"
          />
          <label for="form1">Disability Form</label>
          <br />
        </form>
      </div>
    </>
  );
}

export default App;
