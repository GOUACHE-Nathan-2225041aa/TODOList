import React, {useEffect, useState} from 'react';
import './App.css';

const items = [
    { id: 1, text: "Learn JavaScript", done: false },
    { id: 2, text: "Learn React", done: false },
    { id: 3, text: "Play around in JSFiddle", done: true },
    { id: 4, text: "Build something awesome", done: true }
];

function App() {
    const [todoItems, setTodoItems] = useState(items);
    const [newTask, setNewTask] = useState("");

    const handleChange = (id) => {
        setTodoItems(todoItems.map(item => {
            if (item.id === id) {
                return { ...item, done: !item.done };
            }
            return item;
        }));
    };

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            const newItem = {
                id: todoItems[todoItems.length-1].id + 1   ,
                text: newTask,
                done: false
            };
            setTodoItems([...todoItems, newItem]);
            setNewTask(""); // Clear input after adding task
        }
    };

    const handleDeletion = (id) => {
        todoItems.splice(id-1, 1);
        setTodoItems(
            todoItems.map(item => {
                return item;
            })
        );
        console.log(todoItems)
    }

    const handleSave = () => {
        localStorage.setItem("taskList", JSON.stringify(todoItems))
    }

    const handleLoad = () => {
        let taskList
        try {
            const taskListJson = localStorage.getItem("taskList")
            taskList = JSON.parse(taskListJson)
        }
        catch (e) {
            taskList = items
        }
        setTodoItems(taskList)
    }

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <div>
            <button onClick={handleSave}>Save list</button><button onClick={handleLoad}>Load list</button>
            <h2>Todos:</h2>
            <ol>
                {todoItems.map(item => (
                    <li key={item.id}>
                        <label>
                            <input type="checkbox" onChange={() => handleChange(item.id)} checked={item.done} />
                            <span className={item.done ? "done" : ""}>{item.text}</span>
                            <button onClick={() => handleDeletion(item.id)}>Delete</button>
                        </label>
                    </li>
                ))}
            </ol>
            <input
                type="text"
                placeholder="Enter new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            /><button onClick={handleAddTask}>Add task</button>
        </div>
    );
}

export default App;
