import React from 'react';
import './TodoElement.css';

const todoElement = (props) => (
        <div id={props.id} align={"left"} key={props.id} className={(props.completed ? "CheckedElement" : "Element")}>
            <input type="checkbox" checked={props.completed} onChange={props.checkBoxChanged}/>
            <b>{props.title}</b>
            {props.completed ? <button onClick={props.deleteButtonClicked}>delete</button> : null}
            <div></div>
        </div>
);
export default todoElement;