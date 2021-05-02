import React, { useEffect, useState } from 'react';
import BtnStartStop from '../BtnStartStop/BtnStartStop';
import BtnTimerSelect from '../BtnTimeSelect/BtnTimerSelect';
import Timer from '../Timer/Timer';
// import logo from './logo.svg';
import './App.scss';

function App() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState("25");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [selectedTimer, setSelectedTimer] = useState(0);
  let interval = false;

  function clickedWorkBtn(evt) {
    setSelectedTimer(0);
    setTimerMinutes("25");
    setTimerSeconds("00");
    stopTimer();
    console.log("work");
  }

  function clickedShortBreakBtn(evt) {
    setSelectedTimer(1);
    setTimerMinutes("05");
    setTimerSeconds("00");
    stopTimer();
    console.log("short break");
  }

  function clickedLongBreakBtn(evt) {
    setSelectedTimer(2);
    setTimerMinutes("15");
    setTimerSeconds("00");
    stopTimer();
    console.log("long break");
  }

  function clickedStarStopBtn(evt) {
    if (timerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }

  function startTimer() {
    setTimerRunning(true);
  }

  function stopTimer() {
    setTimerRunning(false);
  }


  function dateNumberToString(number) {
    let val = number.toString();
    if (val.length < 2) {
      val = "0" + val;
    }
    return val;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      //check if timer is running
      if (timerRunning) {
        //parse timer numbers      
        let minutesNum = parseInt(timerMinutes);
        let secondsNum = parseInt(timerSeconds);
        //countdown logic
        if (secondsNum === 0) {
          if (minutesNum > 0) {
            minutesNum--;
            secondsNum = 59;
          }
        } else {
          secondsNum--;
        }
        //convert new counter to strings
        setTimerMinutes(dateNumberToString(minutesNum));
        setTimerSeconds(dateNumberToString(secondsNum));
      }
    }, 1000);
    return () => clearInterval(interval);
  })

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
              <BtnTimerSelect title="Work" selected={selectedTimer === 0} clicked={clickedWorkBtn}></BtnTimerSelect>
              <BtnTimerSelect title="Short Break" selected={selectedTimer === 1} clicked={clickedShortBreakBtn}></BtnTimerSelect>
              <BtnTimerSelect title="Long Break" selected={selectedTimer === 2} clicked={clickedLongBreakBtn}></BtnTimerSelect>
            </div>
            <Timer minutes={timerMinutes} seconds={timerSeconds}></Timer>
            <div className="start-stop-wrap">
              <BtnStartStop title={timerRunning ? "STOP" : "START"} clicked={clickedStarStopBtn}></BtnStartStop>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
