package hsrm.test.todolist;

public class TodoItemNotFoundException extends RuntimeException{
    TodoItemNotFoundException(Long id){
        super("Could not find todo for id "+ id);
    }
}
