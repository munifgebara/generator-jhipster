package br.com.munif.sistemas.seed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class Seed implements ApplicationListener<ContextRefreshedEvent> {

    private AtomicBoolean started = new AtomicBoolean(false);

    @Autowired
    private SeedOne seedOne;
    @Autowired
    private MigraAccess migraAccess;

    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (started.get()) {
            return;
        }
        started.set(true);
        seedOne.seed();
        migraAccess.migra();

    }

}
