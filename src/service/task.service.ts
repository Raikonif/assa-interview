import axios from "axios";
import { BACKEND_MOCK_URL } from "@/constants/general.constants.ts";
import { OPTask, Task } from "@/interfaces/task.interface.ts";

const getTasks = async () => {
  try {
    return await axios.get<Task[]>(`${BACKEND_MOCK_URL}/tasks`);
  } catch (error) {
    console.error("Error getting tasks", error);
    throw error;
  }
};

const createTask = async (task: OPTask) => {
  try {
    return await axios.post(`${BACKEND_MOCK_URL}/tasks`, task);
  } catch (error) {
    console.error("Error creating task", error);
    throw error;
  }
};

const updateTask = async (task: OPTask) => {
  try {
    return await axios.put(`${BACKEND_MOCK_URL}/tasks/${task.id}`, task);
  } catch (error) {
    console.error("Error updating task", error);
    throw error;
  }
};

const deleteTask = async (task: Task) => {
  try {
    return await axios.delete(`${BACKEND_MOCK_URL}/tasks/${task.id}`);
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
};

export { getTasks, createTask, updateTask, deleteTask };
