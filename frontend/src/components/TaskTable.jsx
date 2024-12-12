import { useContext, useEffect } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { TaskContext } from '../context/TaskContext';

const TaskTable = () => {
    const { tasks, fetchTasks, updateTask, deleteTask } = useContext(TaskContext);

    useEffect(() => {
        fetchTasks();
    }, []);

    const columns = [
        {
            title: 'ID',
            field: 'id',
            width: 50,
            hozAlign: 'center',
            formatter: (cell) => `<span class="font-semibold">${cell.getValue()}</span>`,
        },
        {
            title: 'Title',
            field: 'title',
            editor: 'input',
            width: 400,
            hozAlign: 'left',
            formatter: (cell) => `<span class="font-semibold">${cell.getValue()}</span>`,
            headerFilter: "input",
            headerFilterPlaceholder: "Search Title",
            headerFilterFunc: "like",
            headerFilterLiveFilter: true,
        },
        {
            title: 'Status',
            field: 'completed',
            editor: 'select',
            editorParams: { values: ['To Do', 'Done'] },
            width: 100,
            hozAlign: 'center',
            formatter: (cell) => {
                const value = cell.getValue();
                return value
                    ? `<span class="text-green-500 font-semibold">Done</span>`
                    : `<span class="text-red-500 font-semibold">To Do</span>`;
            },
            headerFilter: "select", // Use select dropdown as header filter
            headerFilterParams: {
                values: { "": "All", true: "Done", false: "To Do" }, // Options for the dropdown
            },
            headerFilterPlaceholder: "Filter Status", // Placeholder text
            headerFilterFunc: (headerValue, rowValue) => {
                // Custom filter logic
                if (headerValue === "") {
                    return true; // Show all rows if no filter is selected
                }
                return String(rowValue) === headerValue; // Match the selected value
            },
        }
        ,
        {
            title: 'Remove Todo',
            formatter: () => `<button class="text-white bg-red-600 p-1 hover:scale-110">Delete</button>`,
            cellClick: (e, cell) => deleteTask(cell.getRow().getData().id),
            hozAlign: 'center',
        },
    ];

    return (
        <div>
            <ReactTabulator
                data={tasks}
                columns={columns}
                cellEdited={(cell) => {
                    console.log(cell)
                    console.log(cell.getRow().getData().id)
                    updateTask(cell.getRow().getData().id, cell.getValue())
                }}
                layout="fitData"
                options={{
                    height: '500px',
                }}
            />
        </div>
    );
};

export default TaskTable;
