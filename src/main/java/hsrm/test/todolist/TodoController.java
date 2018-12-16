package hsrm.test.todolist;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TodoController {
    private final TodoRepository repository;

    public TodoController (TodoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/todos")
    List<TodoItem> all(){
        return repository.findAll();
    }

    @GetMapping("/todos/{id}")
    TodoItem one(@PathVariable Long id){
        return repository.findById(id).orElseThrow( () -> new TodoItemNotFoundException(id));
    }

    @DeleteMapping(path = "/todos/{id}")
    TodoItem delOne(@PathVariable Long id){
        TodoItem item = repository.findById(id).orElseThrow( () -> new TodoItemNotFoundException(id));
        repository.delete(item);
        return item;
    }

    @PostMapping(path = "/todos", consumes = "application/json", produces = "application/json")
    public TodoItem addToDo(@RequestBody TodoItem item){
        repository.save(item);
        return item;
    }

    @PutMapping(path = "/todos", consumes = "application/json", produces = "application/json")
    public TodoItem addOrModify(@RequestBody TodoItem item){
        Optional<TodoItem> op = repository.findById(item.id);
        if (op.isPresent()){
            repository.delete(op.get());
            repository.save(item);
        }
        else{
            repository.save(item);
        }
        return item;
    }
}