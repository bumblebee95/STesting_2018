import React, {Component} from 'react';
import TodoElement from './todoelement/TodoElement';
import Axios from 'axios';

//const serverUrl = "https://jsonplaceholder.typicode.com/todos/";
const serverUrl = "http://localhost:8080/todos/";


class TodoList extends Component{

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            saveButtonDisabled: true,
            todos: []
        }
    }

    handleSubmitAndCreateNewTodo = (event) => {
        console.log("[handleSubmitAndCreateNewTodo:enter]");
        event.preventDefault();
        if(this.state.title.length > 0)
        {
            let todo = {
                title:this.state.title,
                state:"open"
            };

            Axios.post("http://localhost:8080/todo", todo)
                .then((response) => {
                    console.log("post successful =", response);
                    this.setState({title:''});
                    let attachedTodos = this.state.todos.concat(response.data);;
                    this.setState({todos:attachedTodos});
                })
                .catch(event => {
                    console.log(event)
                });
        }
        else
            console.log("title not set")

        this.inputElement.value='';
    }

    handleChangingTitle = (event) => {
        let saveButtonDisabled = true;
        event.preventDefault();

        console.log("handleChangingTitle called");
        const newTitle = event.target.value;
        if (newTitle.length > 0)
        {
            saveButtonDisabled = false;
        }
        this.setState({title: newTitle, saveButtonDisabled:saveButtonDisabled});
    }

    apiUpdateTodoItem = (todo) => {
        console.log("[apiUpdateTodoItem] input   : ",todo);
        let sendeTodo = {id:todo.id, state:todo.state, title:todo.title};
        console.log("[apiUpdateTodoItem] send   : ",sendeTodo);

        Axios.put(serverUrl + todo.id, sendeTodo, { crossdomain: true })
            .then((response) => {
                console.log("[apiUpdateTodoItem] Axios response: ",response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    todoElementCheckBoxHandler = (id) => {
        console.log("Checkbox clicked - id",id);
        let newtodos = [];

        newtodos = this.state.todos.map((todo) => {
            if (todo.id === id)
            {
                console.log("todo vorher", todo);
                if(todo.completed)
                    todo.completed = !todo.completed;
                if(todo.state)
                    if (todo.state === "done")
                        todo.state = "open"
                    else
                        todo.state ="done";
                console.log("todo hinterher", todo);
                //hier aktualisiere die URL
                this.apiUpdateTodoItem(todo);
            }
            return todo;
        });
        console.log("newtodos: ",newtodos)
        this.setState({todos:newtodos});
    }

    todoElementDeleteButtonHandler = (id) => {
        console.log("[todoElementDeleteButtonHandler] deleting id:",id);
        Axios.delete(serverUrl+id)
            .then(response => {
                if (response.status === 200){
                    //delete successful now we may update state
                    console.log(this.state.todos);
                    let local_todos = this.state.todos.filter(elem => {return (elem.id !== id);});
                    this.setState({todos:local_todos});
                    console.log(local_todos);

                }
            });
    }

    render = () => {
        console.log("enter TodoList:render");
        let innertodos = [];
        if (this && this.state)
        {
            console.log("state true");
            if ( this.state.todos)
            {
                console.log("state.todos true");
                if (this.state.todos.length > 0)
                {
                    let todostop10 = this.state.todos.slice(0, 10);
                    console.log(todostop10);
                    innertodos = todostop10.map(elem => {
                       if (elem.state) {
                           elem.completed = (elem.state === "done");
                       }
                        return (
                            <TodoElement
                                    id={elem.id}
                                    title={elem.title}
                                    completed={elem.completed}
                                    checkBoxChanged={this.todoElementCheckBoxHandler.bind(this,elem.id)}
                                    deleteButtonClicked={this.todoElementDeleteButtonHandler.bind(this,elem.id)}/>
                        )
                    });
                }
            }
        }
        if (innertodos.length === 0)
        {
            innertodos = <div>Loading Todo-Elements..</div>
        }
        console.log("enter TodoList:render", this.state);
        return (
            <div>
                <div align={"center"} size={"80%"} background="red">
                    <form id="add_todo" onSubmit={this.handleSubmitAndCreateNewTodo}>
                        <input
                            id="todo_title"
                            className="inputAddNew"
                            ref={(inp) => {this.inputElement = inp} }
                            type={"text"}
                            size={"100"}
                            onChange={this.handleChangingTitle}
                            minLength={"5"}
                            placeholder="Add todo item..."/>
                        <span onClick={this.handleSubmitAndCreateNewTodo} className="addBtn">Add</span>
                    </form>
                </div>
                <hr/>
                <div align={"center"}>
                    {innertodos}
                </div>
            </div>
            );
    }

    componentDidMount = () => {
        console.log("enter TodoList:componentDidMount");

        Axios.get(serverUrl)
            .then(response  => {
                console.log(response.data);
                response.data.map((item) => {
                    if (item.state)
                    {
                        //funktioniert mit eigener Todoliste
                        let newitem = null;
                        newitem = {id:item.id, title:item.title, completed:(item.state === "open" ? false : true)};
                        return newitem;
                    }
                    //if (item.completed)
                    return item;
                })
                this.setState({todos: response.data});
            })
            .catch(event => console.log(event));
        console.log("left TodoList:componentDidMount");
        this.inputElement.focus();

    }
    }


export default TodoList;