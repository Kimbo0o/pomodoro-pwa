import React, { useState } from "react";
import Pomodoro from "../Timer/Pomodoro/Pomodoro";
import Tasks from "../Tasks/Tasks/Tasks";

import "./App.scss";

function App() {
  const [selectedTimer, setSelectedTimer] = useState(0);

  function updateSelectedTimer(newValue) {
    setSelectedTimer(newValue);
  }

  return (
    <>
      <div
        id="main-container"
        className={
          "main-container" +
          (selectedTimer === 0
            ? " main-container--work"
            : " main-container--break")
        }
      >
        <div className="bubbles-wrap">
          <div className="bubble bubble--b1"></div>
          <div className="bubble bubble--b2"></div>
          <div className="bubble bubble--b3"></div>
          <div className="bubble bubble--b4"></div>
        </div>
        <Pomodoro
          selectedTimer={selectedTimer}
          updateSelectedTimer={updateSelectedTimer}
        ></Pomodoro>
        <Tasks></Tasks>
      </div>
    </>
  );
}

export default App;
