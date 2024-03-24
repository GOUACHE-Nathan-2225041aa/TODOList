// Footer.js
import React from 'react';
import TaskModal from "./TaskModal";

function Footer({ onSearch, isModalOpen, onRequestClose, onAddTask }) {
    const handleInputChange = (event) => {
        const searchTerm = event.target.value.trim(); // Trim to remove leading and trailing spaces
        onSearch(searchTerm);
    }

    return (
        <div>
            <TaskModal
                isOpen={isModalOpen}
                onRequestClose={onRequestClose}
                onAddTask={onAddTask}
            />
            <input
                type="text"
                placeholder="Quick search..."
                onChange={handleInputChange}
            />
        </div>
    );
}

export default Footer;
