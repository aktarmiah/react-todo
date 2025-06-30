import React, { useEffect, useMemo, useState } from "react";
import { Task } from "./types";
import ListItem from "./components/ListItem";

const cssCenter: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
}

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const tempTasks = [...tasks];
      tempTasks.push({ id: Date.now(), text: newTask, completed: false });
      setTasks(tempTasks);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        let tempTask = { id: task.id, text: task.text, completed: task.completed };
        tempTask.completed = !tempTask.completed;
        return tempTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const [tasksToRender, setTasksToRender] = useState<any[]>([])
  useEffect(() => {
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }
    setTasksToRender(filteredTasks);
  }, [tasks, filter]);

  const totalCount = useMemo(() => {
    return tasksToRender.length;
  }, [tasksToRender]);

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    //TODO: When no tasks to show, render an empty state
  };

  const setFilterButtonStyle = (filterButtonString: string) => {
    return {
      color: filter === filterButtonString ? "blue" : "gray",
    }
  }

  return (
    <div style={cssCenter}>
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add new task"
          style={{ width: "100%" }}
        />
        <button
          onClick={handleAddTask}
          style={{ marginLeft: "10px", backgroundColor: "blue", color: "white" }}
          disabled={newTask.trim() === ""}
        >Add</button>
      </div>
      <div style={{ gap: "10px", display: "flex", justifyContent: "space-between", marginTop: "10px", cursor: "pointer" }}>
        <span onClick={() => setFilter("all")} style={setFilterButtonStyle("all")}>All</span>
        <span onClick={() => setFilter("active")} style={setFilterButtonStyle("active")}>Active</span>
        <span onClick={() => setFilter("completed")} style={setFilterButtonStyle("completed")}>Completed</span>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tasksToRender.map((task, index) => 
          <ListItem 
            key={index} 
            id={task.id} 
            text={task.text} 
            completed={task.completed} 
            index={index} 
            handleToggleComplete={handleToggleComplete}
            handleDeleteTask={handleDeleteTask} />)}
      </ul>
    </div>
  );
}
