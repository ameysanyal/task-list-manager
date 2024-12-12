import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const AddTaskForm = () => {
    const [title, setTitle] = useState('');
    const { addTask } = useContext(TaskContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, completed: false });
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
                type="text"
                placeholder="Add new todo.."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='p-1 outline-none w-72'
            />
            {/* <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="textarea"
            /> */}
            <button type="submit" className="text-white bg-blue-500 py-1 hover:bg-blue-600 px-2">
                Add Task
            </button>
        </form>
    );
};

export default AddTaskForm;
