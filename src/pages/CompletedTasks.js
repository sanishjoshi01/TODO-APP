import TaskAccordion from "../components/TaskAccordion";
import { useState, useEffect } from 'react';
import Button from "../components/Button";


function CompletedTasks() {
    const [completedLocalLists, setCompletedLocalLists] = useState(() => {
        const savedTasks = localStorage.getItem("completedTasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const savedTasks = localStorage.getItem("completedTasks");
            setCompletedLocalLists(savedTasks ? JSON.parse(savedTasks) : []);
        };

        window.addEventListener("tasksUpdated", handleStorageChange);

        return () => {
            window.removeEventListener("tasksUpdated", handleStorageChange);
        };
    }, []);

    const renderedLists = completedLocalLists.length > 0
        ?
        <TaskAccordion
            lists={completedLocalLists}
            completed="Completed"
        />
        :
        <p className="h-60 grid place-items-center">Nothing completed yet!</p>;
    const handleRemoveCompleted = () => {
        localStorage.removeItem("completedTasks");
        window.dispatchEvent(new Event('tasksUpdated'));
    }
    return (<>
        <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">Completed Tasks</h3>
            {completedLocalLists.length > 0 && <Button
                onClick={handleRemoveCompleted}
                className="bg-red-500 text-white hover:bg-red-600 text-md py-1 px-2"
            >
                Remove All
            </Button>}
        </div>
        {renderedLists}
    </>);
};

export default CompletedTasks;