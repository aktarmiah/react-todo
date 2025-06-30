import React from "react";
import { Task } from "../types";

type ListItemProps = Task & {
  index: number;
  handleToggleComplete: (id: number) => void;
  handleDeleteTask: (id: number) => void;
}

export default function ListItem({
      id,
      text,
      completed,
      index,
      handleToggleComplete,
      handleDeleteTask}: ListItemProps) {

  return (
    <li key={index}>
        <span style={{ display: "flex", justifyContent: "start" }}>
        <input
            type="checkbox"
            checked={completed}
            onChange={() => handleToggleComplete(id)}
        />              
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span style={{ 
                whiteSpace: "nowrap",
                textDecoration: completed ? "line-through" : "none",
            }}>
                {text}
            </span>
            <a href="#"
                style={{ whiteSpace: "nowrap", cursor: "pointer" }}
                onClick={() => handleDeleteTask(id)}>[X]
            </a>
        </div>
        </span>
    </li>
  );
}