// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from "./Footer";
import TaskModal from "./TaskModal";

const items = [
    { text: "Learn JavaScript", isChecked: false },
    { text: "Learn React", isChecked: false },
    { text: "Play around in JSFiddle", isChecked: true },
    { text: "Build something awesome", isChecked: true }
]

export function App() {
    const [itemsDone, setItemsDone] = useState(0);
    const [todoItems, setTodoItems] = useState(items);
    const [newTask, setNewTask] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const handleChange = (index) => {
        const updatedItems = [...todoItems];
        updatedItems[index] = { ...updatedItems[index], isChecked: !updatedItems[index].isChecked };
        setTodoItems(updatedItems);
        setItemsDone(updatedItems.filter(item => item.isChecked).length);
        setFilteredItems(updatedItems)
        handleSave();
    }

    const handleAddTask = (newTask) => {
        if (newTask.trim() !== "") {
            const newItem = { text: newTask, isChecked: false };
            setTodoItems([...todoItems, newItem])
            setFilteredItems([...todoItems, newItem]);
            setNewTask("");
            handleCloseModal();
            handleSave();
        }
    }

    const handleDeletion = (index) => {
        const updatedItems = [...todoItems];
        if (updatedItems[index].isChecked) {
            setItemsDone(itemsDone - 1);
        }
        updatedItems.splice(index, 1);
        setTodoItems(updatedItems);
        setFilteredItems(updatedItems)
        handleSave();
    }

    const handleSave = () => {
        localStorage.setItem("taskList", JSON.stringify(todoItems));
    }

    const handleLoad = () => {
        const taskListJson = localStorage.getItem("taskList");
        const taskList = JSON.parse(taskListJson) || items;
        const currentItemsDone = taskList.filter(item => item.isChecked).length;
        setItemsDone(currentItemsDone);
        setTodoItems(taskList);
        setFilteredItems(taskList);
    }

    const handleSearch = (searchTerm) => {
        const filtered = todoItems.filter(item =>
            item.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
    }

    const up = (index) => {
        if(todoItems[index-1] !== undefined){
            const updatedItems = [...todoItems];

            let temp = updatedItems[index-1]
            updatedItems[index-1] = updatedItems[index]
            updatedItems[index] = temp

            setTodoItems(updatedItems);
            setFilteredItems(updatedItems)
            handleSave();
        }
    }

    const down = (index) => {
        if(todoItems[index+1] !== undefined){
            const updatedItems = [...todoItems];

            let temp = updatedItems[index+1]
            updatedItems[index+1] = updatedItems[index]
            updatedItems[index] = temp

            setTodoItems(updatedItems);
            setFilteredItems(updatedItems)
            handleSave();
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <div>
            <Header itemsDone={itemsDone} todoItems={todoItems.length}/>
            <button onClick={handleSave}>Save list</button>
            <button onClick={handleLoad}>Load list</button>
            <h2>Todos:</h2>
            <ol>
                {filteredItems.map((item, index) => (
                    <li key={index}>
                        <label>
                            <input type="checkbox" onChange={() => handleChange(index)} checked={item.isChecked}/>
                            <span className={item.isChecked ? "isChecked" : ""}>{item.text}</span>
                            <button onClick={() => handleDeletion(index)}>Delete</button>
                            <button onClick={() => up(index)}>↑</button>
                            <button onClick={() => down(index)}>↓</button>
                        </label>
                    </li>
                ))}
            </ol>
            <button onClick={handleOpenModal}>Add Task Modal</button>
            <TaskModal isOpen={isModalOpen} onRequestClose={handleCloseModal} onAddTask={handleAddTask}/>
            <Footer
                onSearch={handleSearch}
                isModalOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onAddTask={handleAddTask}
            />
        </div>
    )
}

export default App;
