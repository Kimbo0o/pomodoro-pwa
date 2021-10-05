import React from "react";
import "./BtnStartStop.scss";

function BtnStartStop({ title, alternativeColor, clicked }) {
    return (
        <button className={"btn-start-stop" + (alternativeColor ? " btn-start-stop--alternative-color": "")} onClick={clicked}>{title}</button>
    )
}

export default BtnStartStop;