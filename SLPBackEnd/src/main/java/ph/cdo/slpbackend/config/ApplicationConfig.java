package ph.cdo.slpbackend.config;

import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import ph.cdo.slpbackend.entity.project_model.Status;
import ph.cdo.slpbackend.form.NewProjectForm;
import ph.cdo.slpbackend.service.ProjectService;

import java.util.*;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    @Bean
    public Faker faker(){
        return new Faker();
    }

    @Bean
    public Random random(){
        return new Random();
    }


    @Bean
    @Profile({"dev", "test"})
    public CommandLineRunner commandLineRunner(
            @Autowired Faker faker,
            @Autowired Random random,
            @Autowired ProjectService projectService
            ){
        return args ->{

            for (int i = 0; i < 50; i++) {
                var startSchoolYear =  2017 + random.nextInt(6);
                var endSchoolYear = startSchoolYear+1;
                var randomNum = random.nextInt(2);
                var randomMonth = random.nextInt(6) + 1;
                Date startDate = new DateTime().withDate(randomNum == 0 ? startSchoolYear : endSchoolYear, randomMonth, 1).toDate();
                Date endDate = new DateTime(startDate).plusMonths(random.nextInt(5)).toDate();
                var randomNumberOfPartners = random.nextInt(3)+1;
                String[] partnersOrFunders = new String[randomNumberOfPartners];
                String[] principalProponent = new String[randomNumberOfPartners];
                for(int y = 0; y < partnersOrFunders.length; y++){
                    partnersOrFunders[y] = faker.company().name();
                    principalProponent[y] = faker.name().fullName();
                }

                NewProjectForm form =  NewProjectForm.builder()
                        .leadUnit(faker.company().name())
                        .schoolYearStart((long) (startSchoolYear))
                        .title(faker.company().catchPhrase())
                        .startDate(startDate)
                        .startDateRemarks(faker.lorem().sentence())
                        .endDate(endDate)
                        .endDateRemarks(faker.lorem().sentence())
                        .partnersOrFunders(new ArrayList<String>(Arrays.asList(partnersOrFunders)))
                        .amount(Math.floor(random.nextDouble() * 10000))
                        .amountRemarks(new ArrayList<String>(Arrays.asList(faker.lorem().sentence(), faker.lorem().sentence())))
                        .principalProponent(new ArrayList<String>(Arrays.asList(principalProponent)))
                        .status(Status.values()[random.nextInt(Status.values().length)].name())
                        .remarks(new ArrayList<String>(Arrays.asList(faker.lorem().sentence(), faker.lorem().sentence())))
                        .build();

                projectService.create(form);
        }

            // use the form object
        };
    }
}
