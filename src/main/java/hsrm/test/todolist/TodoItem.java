package hsrm.test.todolist;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class TodoItem {

    @GeneratedValue
    @Id
    public Long id;
    public String title;
    public String state;

    public TodoItem (String title, String state) {
        super();
        this.title = title;
        this.state = state;
    }

    public TodoItem (Long id, String title, String state) {
        super();
        this.id = id;
        this.title = title;
        this.state = state;
    }

    public TodoItem ( ) {
    }
}
