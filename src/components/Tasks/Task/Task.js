import React, { useState } from "react";
import "./Task.scss";
import trash from "../../../assets/img/trash.svg";
import plus from "../../../assets/img/plus.svg";
import check from "../../../assets/img/check.svg";
import TextareaAutosize from "react-textarea-autosize";

function Task({
  updateTask,
  addTask,
  deleteTask,
  inpChecked,
  inpTitle,
  isNew,
  id,
}) {
  const [title, setTitle] = useState(inpTitle ? inpTitle : "");
  const [checked, setChecked] = useState(inpChecked ? inpChecked : false);

  function checkEnterPress(event) {
    if (event.keyCode === 13 && event.shiftKey === false) {
      console.log("test");
      event.preventDefault();
      addNewTask();
    }
  }

  function addNewTask() {
    if (title.length) {
      addTask(title);
      setTitle("");
    }
  }

  function updatedTitle(event) {
    const value = event.target.value;
    setTitle(value);
    if (!isNew) {
      updateTask({ id: id, checked: checked, title: value });
    }
  }

  function toggleChecked() {
    setChecked(!checked);
    updateTask({ id: id, checked: checked, title: title });
  }

  function clickedDelete() {
    deleteTask(id);
  }

  return (
    <>
      <li className="task">
        {!isNew && ( //existing tasks
          <>
            <div className="cb-wrap">
              <input
                type="checkbox"
                id={"cb" + id}
                value={checked}
                onChange={toggleChecked}
              ></input>
              <label htmlFor={"cb" + id}>
                <div
                  className={"rounded-btn" + (checked ? " highlighted" : "")}
                >
                  {checked && ( //show checkmark only for checked value
                    <img src={check} alt="check"></img>
                  )}
                </div>
              </label>
            </div>
            <div className="task-title">
              <TextareaAutosize
                value={title}
                onChange={updatedTitle}
              ></TextareaAutosize>
            </div>
            <div className="function-wrap">
              <button className="delete-btn" onClick={clickedDelete}>
                <img className="trash" src={trash} alt="trash" />
              </button>
            </div>
          </>
        )}
        {isNew && ( // new task
          <>
            <div className="cb-wrap"></div>
            <div className="task-title">
              <TextareaAutosize
                placeholder="Enter new task..."
                value={title}
                onChange={updatedTitle}
                onKeyDown={checkEnterPress}
              ></TextareaAutosize>
            </div>
            <div className="function-wrap">
              <button className="rounded-btn" onClick={addNewTask}>
                <img src={plus} alt="+"></img>
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
}

export default Task;
