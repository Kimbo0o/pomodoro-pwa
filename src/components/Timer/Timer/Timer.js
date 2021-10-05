import React from "react";
import "./Timer.scss";

function Timer({ minutes, seconds }) {
    return (
        <div className="timer">{minutes}:{seconds}</div>
    )
}

export default Timer;