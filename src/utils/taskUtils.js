// Import necessary libraries and modules
import axios from "axios"; // For making HTTP requests
import io from "socket.io-client"; // For real-time communication
import server from "../config/server"; // Configuration for server endpoint
const socket = io(server); // Initialize a socket.io connection with the server

// Utility function to delete a task
export const deleteTaskUtils = (taskId) => {
  // Send a DELETE request to the server to delete the task
  axios.delete(`${server}/api/tasks/${taskId}`, {
    headers: { "Content-Type": "application/json" },
  });
};

// Utility function to add a new task
export const addTaskUtills = (taskInput, setTaskInput) => {
  if (taskInput) {
    // Create a new task object with a unique ID and the provided text
    const newTask = { id: Date.now(), text: taskInput };
    // Send a POST request to the server to add the new task
    axios.post(`${server}/api/tasks`, newTask);
    // Clear the task input field after submission
    setTaskInput("");
  }
};

// Utility function to retrieve all tasks from the server
export const getAllTasks = (setTasks) => {
  axios
    .get(`${server}/api/tasks`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => setTasks(response.data));

  // Set up a real-time socket.io listener for task updates
  socket.on("tasks", (updatedTasks) => {
    // Update the task list when changes are received through the socket
    setTasks(updatedTasks);
  });
};
