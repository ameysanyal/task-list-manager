import { createContext, useEffect, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const [doneCount, setDoneCount] = useState()
    const [toDoCount, setTodoCount] = useState()

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        setTasks(data);
        setDoneCount()
    };

    useEffect(() => {
        const doneTodos = tasks.filter((item) => {
            return item.completed === true
        })
        setDoneCount(doneTodos.length)
        const inProgress = tasks.filter((item) => {
            return item.completed === false
        })
        setTodoCount(inProgress.length)


    }, [tasks])

    const addTask = async (task) => {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        const newTask = await response.json();
        setTasks((prev) => [...prev, newTask]);
    };

    const updateTask = async (id, updatedTask) => {
        console.log(`Id is ${id} and updatedTask is ${updatedTask}`)
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
        fetchTasks();
    };

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask, doneCount, toDoCount }}>
            {children}
        </TaskContext.Provider>
    );
};

