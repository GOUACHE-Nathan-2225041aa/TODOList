import React from 'react';

function Header({itemsDone, todoItems}) {
    let doneCount = 0;
    return(
        <div>
            <h1>Tâches restantes : {todoItems-itemsDone}/{todoItems}</h1>
        </div>
    )
}

export default Header;