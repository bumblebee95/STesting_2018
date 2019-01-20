package hsrm.test.todolist;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping(path = "/todo", consumes = "application/json", produces = "application/json")
    public TodoItem addToDo(@RequestBody TodoItem item){
        return repository.save(item);
    }

    @PostMapping(path = "/todos", consumes = "application/json", produces = "application/json")
    public TodoItem[] addToDo(@RequestBody(required = false) TodoItem[] item){
        for (TodoItem it: item) {
            repository.save(it);
        }
        return item;
    }

    @PutMapping(path = "/todos", consumes = "application/json", produces = "application/json")
    public TodoItem addOrModify(@RequestBody TodoItem item){

        return repository.findById(item.id)
                .map(it -> {
                    it.title = item.title;
                    it.state = item.state;
                    return repository.save(it);
                })
                .orElseGet(() -> {
                    return repository.save(item);
                });
    }
}