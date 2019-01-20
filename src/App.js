import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./todolist/TodoList";
import NewTodo from "./todolist/newtodo/NewTodo";


class App extends Component {

    serverUrl = "https://jsonplaceholder.typicode.com/todos/";

  componentDidMount = () => {
      console.log("enter App:componentDidMount");
  }

  render = () => {
      return (
          <div>
              <h1 align={"center"}>Software Testing <br/> TodoList</h1>
              <hr/>
              <TodoList/>
              <hr/>
              <div align={"Center"}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Hochschule_RheinMain_logo.svg/2000px-Hochschule_RheinMain_logo.svg.png" width={200}/></div>
          </div>
      )
  }

}

export default App;
