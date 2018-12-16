package hsrm.test.todolist;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class LoadDatabase {
    @Bean
    CommandLineRunner initDatabase(TodoRepository repository){
        return args -> {
            log.info("Preloading " + repository.save(new TodoItem("Titel 1", "Status 1")));
            log.info("Preloading " + repository.save(new TodoItem("Titel 2", "Status 2")));
            log.info("Preloading " + repository.save(new TodoItem("Titel 3", "Status 3")));
        };

    }
}
