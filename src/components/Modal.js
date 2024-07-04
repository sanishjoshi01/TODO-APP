import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { ImCross } from "react-icons/im";
import moment from 'moment';

function Modal({ onClose }) {
    //for modal
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    const handleClose = () => {
        onClose();
    };

    //State and events for form handling
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleDateChange = (e) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setDate(newDate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ title, date })

        localStorage.setItem("tasks", JSON.stringify(tasks));
        window.dispatchEvent(new Event('tasksUpdated'));
        onClose();
    };

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 bg-gray-300 opacity-80">

            </div>
            <div className="fixed inset-0 bg-white p-10 m-40 w-[800px] mx-auto">
                <div className='grid gap-6'>
                    <div className='flex justify-between'>
                        Add new task
                        <ImCross onClick={handleClose} className='cursor-pointer' />
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto min-w-[400px]"
                    >
                        <div className="mb-5">
                            <label
                                htmlFor="task"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Task name:
                                {title}
                            </label>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                type="text"
                                id="task"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="date"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Due Date:
                                {date}
                            </label>
                            <input
                                onChange={handleDateChange}
                                type="date"
                                id="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required
                            />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    </form>
                </div>
            </div>
        </>,
        document.querySelector('#modal'),
    )
};

export default Modal;