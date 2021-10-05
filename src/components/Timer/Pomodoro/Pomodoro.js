import React, { useEffect, useState } from "react";
import BtnStartStop from "../../UI/BtnStartStop/BtnStartStop";
import BtnTimerSelect from "../../UI/BtnTimeSelect/BtnTimerSelect";
import Timer from "../Timer/Timer";
import doneSound from "../../../assets/audio/done.mp3";
import "./Pomodoro.scss";

function Pomodoro({ selectedTimer, updateSelectedTimer }) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState("25");
  const [timerSeconds, setTimerSeconds] = useState("00");
  let interval = false;

  function goToWork() {
    updateSelectedTimer(0);
    setTimerMinutes("25");
    setTimerSeconds("00");
    stopTimer();
  }

  function goToShortBreak() {
    updateSelectedTimer(1);
    setTimerMinutes("05");
    setTimerSeconds("00");
    stopTimer();
  }

  function goToLongBreak() {
    updateSelectedTimer(2);
    setTimerMinutes("15");
    setTimerSeconds("00");
    stopTimer();
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
    </>
  );
}

export default Pomodoro;
