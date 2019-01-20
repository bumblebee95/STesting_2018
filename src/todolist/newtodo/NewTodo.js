import React, {Component} from 'react'
import Axios from 'axios'

const serverUrl = "http://localhost:8080/todos/";

class NewTodo extends Component{

    state={title:'', saveButtonDisabled:true};

    handlerSaveNewTodo = () => {
        let todo = null;
        todo = {title:"axios generiert todo", state:"open"};
        Axios.post(serverUrl, todo)
            .then((response) => console.log(response))
            .catch(event => console.log(event));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit called", event);

        if(this.state.title.length > 0)
        {
            let todo = {title:this.state.title, state:"open"};
            Axios.post(serverUrl, todo)
                .then((response) => {
                    console.log(response);
                    this.setState({title:''});
                })
                .catch(event => console.log(event));
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


    render = () => {
        return(
            <div align={"center"} size={"80%"} background="red">
                <form onSubmit={this.handleSubmit}>
                <input
                    className="inputAddNew"
                    ref={(inp) => {this.inputElement = inp} }
                    type={"text"}
                    size={"100"}
                    onChange={this.handleChangingTitle}
                    minLength={"5"}
                    placeholder="Add todo item..."/>
                    <span onClick={this.handleSubmit} className="addBtn">Add</span>
                </form>
            </div>
        );
    }

    componentDidMount(){
        this.inputElement.focus();
    }
}

export default NewTodo;