// Import necessary libraries and components
import React, { useState, useEffect } from "react";

import "./Todo.css";
import { Button, Container, Form, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteTaskUtils,
  addTaskUtills,
  getAllTasks,
} from "../utils/taskUtils";
// Create a socket connection to the server

// Define the Todo component
function Todo() {
  // State variables for managing tasks and input
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Fetch tasks from the server and set up real-time updates
  useEffect(() => {
    // Fetch tasks from the server and set them in the state
    getAllTasks(setTasks);
  }, []);

  // Function to add a new task
  const addTask = () => {
    if (!taskInput) {
      return toast.error("Please add task");
    }
    addTaskUtills(taskInput, setTaskInput);
    toast.success("Task added successfully!");
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    deleteTaskUtils(taskId);
    toast.success("Task deleted successfully!");
  };

  return (
    <Container>
      <h1>To-Do List</h1>
      <div className="input-container">
        <Form.Control
          value={taskInput}
          size="lg"
          type="text"
          placeholder="Enter your task"
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <Button size="lg" style={{ width: "150px" }} onClick={addTask}>
          Add Todo
        </Button>
        <br />
      </div>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
 
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task?.id}>
             
              <td className='col-9'>{task?.text}</td>
              <td>
                <Button variant="danger" onClick={() => deleteTask(task?.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ToastContainer />


    </Container>
  );
}

export default Todo;
