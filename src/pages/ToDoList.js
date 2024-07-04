import TaskAccordion from "../components/TaskAccordion";
import { useState, useEffect } from 'react';
import Button from "../components/Button";

function ToDoList() {
    const [localLists, setLocalLists] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const savedTasks = localStorage.getItem("tasks");
            setLocalLists(savedTasks ? JSON.parse(savedTasks) : []);
        };

        window.addEventListener("tasksUpdated", handleStorageChange);

        return () => {
            window.removeEventListener("tasksUpdated", handleStorageChange);
        };
    }, []);

    const renderedLists = localLists.length > 0
        ?
        <TaskAccordion
            lists={localLists}
        />
        :
        <p className="h-60 grid place-items-center">No task yet! Add Now</p>;

    const handleRemoveTodos = () => {
        localStorage.removeItem("tasks");
        window.dispatchEvent(new Event('tasksUpdated'));
    };


    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">To-Do Lists</h3>
                {localLists.length > 0 && <Button
                    onClick={handleRemoveTodos}
                    className="bg-red-500 text-white hover:bg-red-600 text-md py-1 px-2"
                >
                    Remove All
                </Button>}
            </div>

            {renderedLists}
        </>);
};

export default ToDoList;