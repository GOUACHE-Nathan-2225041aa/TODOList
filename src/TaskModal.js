// TaskModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function TaskModal({ isOpen, onRequestClose, onAddTask }) {
    const [newTask, setNewTask] = useState("");

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    }

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            onAddTask(newTask);
            setNewTask("");
            onRequestClose();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Create Task Modal"
        >
            <h2>Create Task</h2>
            <input
                type="text"
                placeholder="Enter new task"
                value={newTask}
                onChange={handleInputChange}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={onRequestClose}>Cancel</button>
        </Modal>
    );
}

export default TaskModal; // Assurez-vous que l'exportation est correcte
