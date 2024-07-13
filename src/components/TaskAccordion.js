import { useState } from "react";
import { MdArrowLeft, MdArrowDropDown, MdCalendarMonth, MdCheck, MdDelete } from "react-icons/md";

function TaskAccordion({ lists, completed }) {
    const isComplete = completed === 'Completed' ? true : false;

    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleClick = (newIndex) => {
        if (expandedIndex === newIndex) {
            setExpandedIndex(-1);
        }
        else {
            setExpandedIndex(newIndex);
        }
    };

    const handleDelete = (indexToRemove) => {
        const newTasks = JSON.parse(localStorage.getItem(`${isComplete ? 'completedTasks' : 'tasks'}`)) || [];
        const updatedTasks = newTasks.filter((newtask, index) => {
            return index !== indexToRemove;
        });

        localStorage.setItem(`${isComplete ? 'completedTasks' : 'tasks'}`, JSON.stringify(updatedTasks));

        window.dispatchEvent(new Event('tasksUpdated'));
    };

    const handleComplete = (indexToComplete) => {
        const date = new Date();
        const currentDate = date.toString().slice(0, 15);

        const savedTasks = JSON.parse(localStorage.getItem(`${isComplete ? 'completedTasks' : 'tasks'}`)) || [];

        const task = savedTasks.filter((task, index) => {
            return index === indexToComplete;
        });
        task[0].date = currentDate;

        const removedTask = savedTasks.filter((task, index) => {
            return index !== indexToComplete;
        });

        localStorage.setItem(`${isComplete ? 'completedTasks' : 'tasks'}`, JSON.stringify(removedTask));

        let completedTasks = JSON.parse(localStorage.getItem(`${!isComplete ? 'completedTasks' : 'tasks'}`)) || [];

        completedTasks.push(task[0]);
        localStorage.setItem(`${!isComplete ? 'completedTasks' : 'tasks'}`, JSON.stringify(completedTasks));

        window.dispatchEvent(new Event('tasksUpdated'));
    };

    const renderedLists = lists.map((list, index) => {
        const date = new Date(list.date);
        const newDate = date.toString().slice(0, 15);

        const isExpanded = index === expandedIndex;

        const icon = <span>
            {isExpanded ? <MdArrowDropDown className="size-7" /> : <MdArrowLeft className="size-7" />}
        </span>

        return (
            < div
                key={index}
                className={`w-96 rounded-[20px] p-5 grid gap-3 border border-black 
                    ${isComplete ? 'bg-[#71F79F]' : 'bg-white'}`}
            >
                <div
                    onClick={() => handleClick(index)}
                    className="flex items-center justify-between cursor-pointer"
                >
                    <div className="font-medium text-sky-500 text-[20px]">{list.title}</div>
                    {icon}
                </div>
                <div className="flex items-center gap-2 text-[14px]">
                    <MdCalendarMonth /><span>{newDate}</span>
                </div>

                {
                    isExpanded &&
                    <div className="flex justify-between">
                        <button
                            onClick={() => handleComplete(index)}
                            className="flex items-center gap-1 hover:underline"
                        >
                            <MdCheck />{isComplete ? 'Mark as incomplete' : 'Mark as completed'}
                        </button>
                        <button
                            onClick={() => handleDelete(index)}
                            className="flex items-center gap-1 hover:underline"
                        >
                            <MdDelete /> Remove
                        </button>
                    </div>
                }
            </div >
        );
    });

    return (
        <div className="grid gap-6 m-4 p-4">
            {renderedLists}
        </ div>
    );
}

export default TaskAccordion;