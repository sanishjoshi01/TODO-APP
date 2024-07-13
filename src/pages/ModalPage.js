import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

function ModalPage() {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(!showModal);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="flex mx-40 my-4">
            <div className="flex gap-4">
                <Button onClick={handleClick}>Add new task</Button>

            </div>
            {showModal && <Modal onClose={handleClose} />}
        </div>
    )
}

export default ModalPage;