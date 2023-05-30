package ph.cdo.slpbackend;

import com.github.javafaker.Faker;
import org.joda.time.DateTime;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import ph.cdo.slpbackend.dto.ProjectDTO;
import ph.cdo.slpbackend.entity.Project;
import ph.cdo.slpbackend.entity.project_model.Status;
import ph.cdo.slpbackend.form.NewProjectForm;
import ph.cdo.slpbackend.repository.ProjectRepository;
import ph.cdo.slpbackend.service.ProjectService;

import java.util.*;

@SpringBootTest
@ActiveProfiles("test")
public class ProjectServiceTest {
    private final Faker faker;
    private final Random random;

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;
    private List<NewProjectForm> newProjectFormList;

    public ProjectServiceTest(@Autowired Faker faker, @Autowired Random random, @Autowired ProjectService projectService, @Autowired ProjectRepository projectRepository) {
        this.faker = faker;
        this.random = random;
        this.projectService = projectService;
        this.projectRepository = projectRepository;
        newProjectFormList = new ArrayList<>();
    }

    @BeforeEach
    public void initialize(){
        for (int i = 0; i < 25; i++) {
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

            newProjectFormList.add(form);
            // use the form object
        }
    }

    @AfterEach
    void reset(){
        newProjectFormList = new ArrayList<>();
        projectRepository.deleteAll();
    }


    @Test
    void testInitialize(){
        Assertions.assertEquals(25, newProjectFormList.size());

    }

    @Test
    void testingCreate(){
        for(int i = 0; i < newProjectFormList.size(); i++){
            Project createdProject = projectService.create(newProjectFormList.get(i));
            Assertions.assertNotNull(createdProject);
            System.out.println("Created Project no. " + (i+1));
            System.out.println(createdProject.toString());

        }
        Assertions.assertEquals(25, projectRepository.findAll().size());


        List<ProjectDTO> projectDTOList = projectService.retrieve();

        Assertions.assertNotNull(projectDTOList);

        Assertions.assertEquals(25, projectDTOList.size());

        var map = projectService.retrieveMappedProjects();

        for (Map.Entry<String, List<ProjectDTO>> entry : map.entrySet()) {
            String schoolYear = entry.getKey();
            List<ProjectDTO> projects = entry.getValue();

            System.out.println("School Year: " + schoolYear);
            for (ProjectDTO project : projects) {
                System.out.println("Project ID: " + project.getId());
                // Print other project details as needed
            }
            System.out.println();
        }

        Assertions.assertNotNull(map);


    }


    @Test
    void testingFindByID(){
        Assertions.assertThrows(RuntimeException.class, ()->{
           Project project = projectService.retrieve(1000L);
        });
    }

    @Test
    void testUpdateForm(){
        NewProjectForm newProjectForm = createForm();
        Project project = projectService.create(newProjectForm);

        Assertions.assertNotNull(project);

        Double oldAmount = project.getProjectAmount().getAmount();
        List<String> oldProjectRemarks = project.getProjectRemarks();


        newProjectForm.setAmount((double)100000);
        newProjectForm.setRemarks(null);

        project = projectService.update(project.getId(), newProjectForm);

        Assertions.assertTrue(oldAmount.doubleValue() != project.getProjectAmount().getAmount().doubleValue());
        Assertions.assertFalse(oldProjectRemarks.get(0).equalsIgnoreCase(project.getProjectRemarks().get(0)));
        Assertions.assertEquals(project.getProjectRemarks().get(0), "None");
    }

    @Test
    void testDelete(){

        for(int i = 0; i < newProjectFormList.size(); i++){
            Project createdProject = projectService.create(newProjectFormList.get(i));
            Assertions.assertNotNull(createdProject);
            System.out.println("Created Project no. " + (i+1));
            System.out.println(createdProject.toString());

        }
        Assertions.assertTrue(projectService.delete(projectRepository.findAll().get(0).getId()));
        Assertions.assertEquals(24, projectRepository.findAll().size());
    }


    private NewProjectForm createForm(){
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

        return form;
    }

}
