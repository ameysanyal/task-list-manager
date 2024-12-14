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
            mutator: (value, data, type) => {
                if (type === "edit") {
                    console.log("Edited cell:", value);
                    console.log(data.id)
                    updateTask(data.id, { "title": value });
                }
                return value;
            },
        },
        {
            title: 'Status',
            field: 'completed',
            editor: 'list',
            editorParams: {
                values: [
                    { label: 'To Do', value: false },
                    { label: 'Done', value: true }
                ],
                verticalNavigation: true
            },
            width: 100,
            hozAlign: 'center',
            formatter: (cell) => {
                const value = cell.getValue();
                return value
                    ? `<span class="text-green-500 font-semibold">Done</span>`
                    : `<span class="text-red-500 font-semibold">To Do</span>`;
            },
            headerFilter: "list",
            headerFilterParams: {
                values: [
                    { label: 'All', value: '' },
                    { label: 'Done', value: 'true' },
                    { label: 'To Do', value: 'false' }
                ]
            },
            headerFilterPlaceholder: "Filter Status",
            headerFilterFunc: (headerValue, rowValue) => {
                if (headerValue == '') {
                    return true;
                }
                return String(rowValue) === headerValue;
            },
            mutator: (value, data, type) => {
                if (type === "edit") {
                    updateTask(data.id, { "completed": value });
                }
                return value;
            },
        },

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
                layout="fitData"
                className="tabulator-container"
            />

        </div>
    );
};

export default TaskTable;


// mutator: it is function that is called before the cell value is updated
//formatter: function for styling cell content
//headerFilterFunc: for adding filtering logic
