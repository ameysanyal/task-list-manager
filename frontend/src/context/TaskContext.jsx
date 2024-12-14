import { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config.js';

const backendUrl = config.backendUrl;

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();

// eslint-disable-next-line react/prop-types
export const TaskProvider = ({ children }) => {

    // tasks state is for total tasks
    // doneCount state is for completed tasks
    // toDoCount state is for tasks in progress

    const [tasks, setTasks] = useState([]);
    const [doneCount, setDoneCount] = useState(0);
    const [toDoCount, setTodoCount] = useState(0);


    // Get request for fetching all tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch(`${backendUrl}/tasks`);
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            toast.error("Failed to fetch tasks", error);
        }
    };

    // calculating completed task and tasks in progress
    useEffect(() => {
        const doneTodos = tasks.filter((item) => item.completed === true);
        setDoneCount(doneTodos.length);
        const inProgress = tasks.filter((item) => item.completed === false);
        setTodoCount(inProgress.length);
    }, [tasks]);


    // POST request for adding a new task
    const addTask = async (task) => {
        try {
            const response = await fetch(`${backendUrl}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error("Failed to add task");
            const newTask = await response.json();
            setTasks((prev) => [...prev, newTask]);
            toast.success("New Task Added Successfully");
        } catch (error) {
            toast.error("Failed to add task", error);
        }
    };

    // PUT request for editing task title and status
    const updateTask = async (id, data) => {
        try {
            await fetch(`${backendUrl}/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setTasks((prev) =>
                prev.map((task) => (task.id === id ? { ...task, ...data } : task))
            );
            toast.info(`Task id:${id} Edited Successfully `);
        } catch (error) {
            toast.error("Failed to edit task", error);
        }
    };

    // DELETE request for deleting a task
    const deleteTask = async (id) => {
        try {
            await fetch(`${backendUrl}/tasks/${id}`, { method: 'DELETE' });
            setTasks((prev) => prev.filter((task) => task.id !== id));
            toast.info(`Task id:${id} Deleted Successfully`);
        } catch (error) {
            toast.error("Failed to delete task", error);
        }
    };

    return (
        <>
            <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask, doneCount, toDoCount }}>
                {children}
            </TaskContext.Provider>
            <ToastContainer position="bottom-left" autoClose={3000} />
        </>
    );
};
