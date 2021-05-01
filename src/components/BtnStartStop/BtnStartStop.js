import React from "react";
import "./BtnStartStop.scss";

function BtnStartStop({ title, clicked }) {
    return (
        <button className="btn-start-stop" onClick={clicked}>{title}</button>
    )
}

export default BtnStartStop;