import React from 'react';
import BtnStartStop from '../BtnStartStop/BtnStartStop';
import BtnTimerSelect from '../BtnTimeSelect/BtnTimerSelect';
import Timer from '../Timer/Timer';
// import logo from './logo.svg';
import './App.scss';

function App() {
  function clickedWorkBtn(evt) {
    console.log("work");
  }
  function clickedShortBreakBtn(evt) {
    console.log("short break");
  }
  function clickedLongBreakBtn(evt) {
    console.log("long break");
  }
  return (
    <>
      <div className="main-container">
        <div className="bubbles-wrap">
          <div className="bubble bubble--b1"></div>
          <div className="bubble bubble--b2"></div>
        </div>
        <div className="glass-container">
          <div className="glass-container-content">
            <div className="timer-select-btns">
              <BtnTimerSelect title="Work" selected="true" clicked={clickedWorkBtn}></BtnTimerSelect>
              <BtnTimerSelect title="Short Break" clicked={clickedShortBreakBtn}></BtnTimerSelect>
              <BtnTimerSelect title="Long Break" clicked={clickedLongBreakBtn}></BtnTimerSelect>
            </div>
            <Timer minutes="24" seconds="59"></Timer>
            <div className="start-stop-wrap">
              <BtnStartStop title="START"></BtnStartStop>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
