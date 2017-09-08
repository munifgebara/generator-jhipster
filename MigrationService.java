package br.com.munif.testes.model.seed;

import br.com.munif.framework.vicente.core.VicThreadScope;
import br.com.munif.testes.application.CountryService;
import br.com.munif.testes.application.DepartmentService;
import br.com.munif.testes.application.EmployeeService;
import br.com.munif.testes.application.JobHistoryService;
import br.com.munif.testes.application.JobService;
import br.com.munif.testes.application.LocationService;

import br.com.munif.testes.application.PessoaService;
import br.com.munif.testes.application.RegionService;
import br.com.munif.testes.application.TaskService;
import br.com.munif.testes.domain.Country;
import br.com.munif.testes.domain.Department;
import br.com.munif.testes.domain.Employee;
import br.com.munif.testes.domain.Job;
import br.com.munif.testes.domain.JobHistory;
import br.com.munif.testes.domain.Location;
import br.com.munif.testes.domain.Pessoa;
import br.com.munif.testes.domain.Region;
import br.com.munif.testes.domain.Task;
import br.com.munif.testes.domain.enumeration.Language;
import com.healthmarketscience.jackcess.Column;
import com.healthmarketscience.jackcess.DatabaseBuilder;
import com.healthmarketscience.jackcess.Row;
import com.healthmarketscience.jackcess.Table;
import java.io.File;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MigraService {

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private RegionService regionService;

    @Autowired
    private CountryService countryService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private JobHistoryService jobHistoryService;

    @Autowired
    private JobService jobService;

    @Autowired
    private TaskService taskService;

    @Transactional
    public void migra() {
        VicThreadScope.gi.set("G1");
        VicThreadScope.ui.set("U1");
        if (pessoaService.quantidade() > 0) {
            return;
        }
        Pessoa p = new Pessoa();
        p.setNome("Munif");
        pessoaService.save(p);

        Region r1 = new Region("América");
        Region r2 = new Region("Europa");
        regionService.save(r1);
        regionService.save(r2);

        Country c1 = new Country("Brasil");
        c1.setRegion(r1);
        countryService.save(c1);

        Country c2 = new Country("França");
        c2.setRegion(r2);
        countryService.save(c2);

        Location l1 = new Location("Rua A", "87010", "Maringa", "PR");
        l1.setCountry(c1);
        locationService.save(l1);

        Location l2 = new Location("Rua A", "87010", "Maringa", "PR");
        l1.setCountry(c2);
        locationService.save(l2);

        Department d1 = new Department("TI");
        d1.setLocation(l1);
        departmentService.save(d1);

        Employee manager = new Employee("Felipe", "Sabanini", "fs@gmail.com", "123", ZonedDateTime.now(), 5000l, 1000l);
        manager.setDepartment(d1);
        employeeService.save(manager);

        Employee e1 = new Employee("Munif", "Gebara", "munifgebara@gmail.com", "123", ZonedDateTime.now(), 5000l, 1000l);
        e1.setDepartment(d1);
        e1.setManager(manager);
        employeeService.save(e1);

        Employee e2 = new Employee("Duda", "Gebara", "dudagebara@gmail.com", "123", ZonedDateTime.now(), 5000l, 1000l);
        e2.setDepartment(d1);
        e2.setManager(manager);
        employeeService.save(e2);

        Task task1=new Task("Arrumar a mesa", "Arrumar a mesa");
        taskService.save(task1);
        Task task2=new Task("Arrumar a casa", "Arrumar a casa");
        taskService.save(task2);

        Job job1=new Job("Developer", 1000l, 5000l);
        job1.setEmployee(e1);
        job1.addTask(task2);
        job1.addTask(task1);
        jobService.save(job1);
        
        JobHistory jobHistory1=new JobHistory(ZonedDateTime.now(), ZonedDateTime.now(), Language.ENGLISH);
        jobHistory1.setDepartment(d1);
        jobHistory1.setEmployee(manager);
        jobHistory1.setJob(job1);
        jobHistoryService.save(jobHistory1);

    }

}
