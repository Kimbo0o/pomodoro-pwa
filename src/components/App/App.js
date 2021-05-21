import React, { useEffect, useState } from "react";
import BtnStartStop from "../BtnStartStop/BtnStartStop";
import BtnTimerSelect from "../BtnTimeSelect/BtnTimerSelect";
import Timer from "../Timer/Timer";
import doneSound from "../../assets/audio/done.mp3";
// import logo from './logo.svg';
import "./App.scss";

function App() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState("25");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [selectedTimer, setSelectedTimer] = useState(0);
  let interval = false;

  function goToWork() {
    setSelectedTimer(0);
    setTimerMinutes("25");
    setTimerSeconds("00");
    stopTimer();
    console.log("work");
  }

  function goToShortBreak() {
    setSelectedTimer(1);
    setTimerMinutes("05");
    setTimerSeconds("00");
    stopTimer();
    console.log("short break");
  }

  function goToLongBreak() {
    setSelectedTimer(2);
    setTimerMinutes("15");
    setTimerSeconds("00");
    stopTimer();
    console.log("long break");
  }

  function clickedStarStopBtn() {
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

  function playDoneSound() {
    const audio = new Audio(doneSound);
    audio.play();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      //check if timer is running
      if (timerRunning) {
        //parse timer numbers
        let minutesNum = parseInt(timerMinutes);
        let secondsNum = parseInt(timerSeconds);
        if (secondsNum === 0 && minutesNum === 0) {
          //timer is at 00:00
          stopTimer();
          playDoneSound();
          //change selected timer
          if (selectedTimer === 1 || selectedTimer === 2) {
            goToWork();
          } else {
            goToShortBreak();
          }
        } else {
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
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div
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
        </div>
        <div className="glass-container">
          <div className="glass-container-content">
            <div className="timer-select-btns">
              <BtnTimerSelect
                title="Work"
                selected={selectedTimer === 0}
                clicked={goToWork}
              ></BtnTimerSelect>
              <BtnTimerSelect
                title="Short Break"
                selected={selectedTimer === 1}
                clicked={goToShortBreak}
              ></BtnTimerSelect>
              <BtnTimerSelect
                title="Long Break"
                selected={selectedTimer === 2}
                clicked={goToLongBreak}
              ></BtnTimerSelect>
            </div>
            <Timer minutes={timerMinutes} seconds={timerSeconds}></Timer>
            <div className="start-stop-wrap">
              <BtnStartStop
                title={timerRunning ? "STOP" : "START"}
                alternativeColor={selectedTimer !== 0 ? true : false}
                clicked={clickedStarStopBtn}
              ></BtnStartStop>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
