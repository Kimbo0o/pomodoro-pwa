import React, { useState, useEffect } from "react";
import Task from "../Task/Task";
import "./Tasks.scss";
import { v4 as uuidv4 } from "uuid";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    //component did mount
    loadTasksLocally();
  }, []);

  function updateTask(updatedTask) {
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    tasks[index] = updatedTask;
    setTasks(tasks);
    saveTasksLocally();
  }

  function addTask(title) {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        checked: false,
        title,
      },
    ]);
    saveTasksLocally(); //TODO: Fix this..
    //scroll down
    window.setTimeout(() => {
      document.getElementById("main-container").scrollBy(0, 1000);
    }, 100);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    saveTasksLocally();
  }

  function saveTasksLocally() {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksLocally() {
    const tasksStr = window.localStorage.getItem("tasks");
    console.log(tasksStr);
    if (tasksStr) {
      setTasks(JSON.parse(tasksStr));
    }
  }

  return (
    <>
      <div className="glass-container">
        <div className="glass-container-content">
          <h2 className="tasks-header">Tasks</h2>
          <ul className="tasks-list">
            {tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  inpTitle={task.title}
                  inpChecked={task.checked}
                  isNew={false}
                  id={task.id}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                ></Task>
              );
            })}
            <Task isNew={true} addTask={addTask}></Task>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Tasks;
