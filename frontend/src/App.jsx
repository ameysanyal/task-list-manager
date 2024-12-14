import { TaskProvider } from './context/TaskContext';
import TaskTable from './components/TaskTable';
import AddTaskForm from './components/AddTaskForm';
import { TaskContext } from './context/TaskContext';
import { useContext } from 'react';

const TaskStats = () => {
  const { doneCount, toDoCount } = useContext(TaskContext);

  return (
    <div className='flex space-x-2 my-2'>
      <div className="text-red-500 bg-red-50 border border-red-500 py-1 px-2 font-semibold">
        In Progess Tasks: {toDoCount}
      </div>
      <div className="text-green-500 bg-green-50 border border-green-500 py-1 px-2 font-semibold">
        Completed Tasks: {doneCount}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <div className="flex flex-col items-center p-4 space-y-2 h-screen bg-gradient-to-b from-cdarkblue  via-clighblue  to-cdarkblue">
        <h1 className="text-2xl font-bold mb-2 text-center text-white">Task Manager</h1>
        <div className='flex flex-col items-center sm:flex-row sm:space-x-4'>

          <TaskStats />
          <AddTaskForm />
        </div>
        <div className='w-3/4 sm:w-fit'>
          <TaskTable />
        </div>

      </div>
    </TaskProvider>
  );
};

export default App;
