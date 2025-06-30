import React from "react";

/**
 * An empty state component to display when there are no tasks to show
 * @returns A div with a message and a button to add a task
 */
export default function EmptyState() {
  return (
    <div style={{ 
      textAlign: "center", 
      marginTop: "20px", 
      padding: "20px", 
      border: "2px solid #ccc", 
      borderRadius: "12px",
      backgroundColor: "#f9f9f9"
    }}>
      <h3>No tasks to show</h3>
      <span>Add a task to get started</span>
    </div>
  );
}