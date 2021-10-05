import React from "react";
import "./BtnTimerSelect.scss";

function BtnTimerSelect({ title, clicked, selected }) {
    return (
        <button className={"btn-timerselect" + (selected ? " btn-timerselect--selected" : "")} onClick={clicked}>{title}</button>
    )
}

export default BtnTimerSelect;