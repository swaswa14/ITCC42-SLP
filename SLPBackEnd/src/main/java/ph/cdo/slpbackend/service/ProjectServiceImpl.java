package ph.cdo.slpbackend.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ph.cdo.slpbackend.dto.ProjectDTO;
import ph.cdo.slpbackend.entity.Project;
import ph.cdo.slpbackend.entity.project_model.ProjectAmount;
import ph.cdo.slpbackend.entity.project_model.ProjectDate;
import ph.cdo.slpbackend.entity.project_model.SchoolYear;
import ph.cdo.slpbackend.form.NewProjectForm;
import ph.cdo.slpbackend.repository.ProjectRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService{
    private final ProjectRepository projectRepository;

    @Override
    public Project create(NewProjectForm newProjectForm) {
        Project project = dtoToEntity(newProjectForm);

        return projectRepository.save(project);
    }

    @Override
    public List<ProjectDTO> retrieve() {
        List<ProjectDTO> projectDTOS = new ArrayList<>();
        List<Project> projectList = projectRepository.findAll();

        for (Project project : projectList) {
            projectDTOS.add(entityToDTO(project));
        }

        return projectDTOS;
    }

    @Override
    public Project retrieve(Long id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if(optionalProject.isEmpty())
            throw new RuntimeException("Project not Found");

        return optionalProject.get();
    }

    @Override
    public Map<String, List<ProjectDTO>> retrieveMappedProjects() {
        List<ProjectDTO> projectList = retrieve();
        // Create a custom comparator to sort the School Year strings in descending order
        Comparator<String> schoolYearComparator = (s1, s2) -> {
            // Extract the start years from the School Year strings
            Long startYear1 = extractStartYear(s1);
            Long startYear2 = extractStartYear(s2);

            // Sort in descending order based on the start years
            return startYear2.compareTo(startYear1);
        };

        Map<String, List<ProjectDTO>> projectsBySchoolYear = new TreeMap<>(schoolYearComparator);


        projectList.forEach(project -> {
            String schoolYear = project.getSchoolYear();
            projectsBySchoolYear.computeIfAbsent(schoolYear, k -> new ArrayList<>()).add(project);
        });


        for (Map.Entry<String, List<ProjectDTO>> entry : projectsBySchoolYear.entrySet()) {

            List<ProjectDTO> projects = entry.getValue();

            for (int i = 0; i < projects.size(); i++) {
                projects.get(i).setNumber(i+1);
            }

        }

        return projectsBySchoolYear;

    }

    @Override
    public Project update(Long id, NewProjectForm newProjectForm) {
      Project project = retrieve(id);
        project.setLeadUnit((newProjectForm.getLeadUnit() != null && !newProjectForm.getLeadUnit().trim().isEmpty()) ? newProjectForm.getLeadUnit() : "None");

        project.setSchoolYear((newProjectForm.getSchoolYearStart() != null && newProjectForm.getSchoolYearEnd() != null) ?
                SchoolYear.builder()
                        .startYear(newProjectForm.getSchoolYearStart())
                        .endYear(newProjectForm.getSchoolYearEnd())
                        .build()
                : project.getSchoolYear());

        project.setTitle((newProjectForm.getTitle() != null && !newProjectForm.getTitle().trim().isEmpty()) ? newProjectForm.getTitle() : project.getTitle());

        project.setStartDate((newProjectForm.getStartDate() != null) ?
                ProjectDate.builder()
                        .date(newProjectForm.getStartDate())
                        .remarks(newProjectForm.getStartDateRemarks())
                        .build()
                : project.getStartDate());

        project.setEndDate((newProjectForm.getEndDate() != null) ?
                ProjectDate.builder()
                        .date(newProjectForm.getEndDate())
                        .remarks(newProjectForm.getEndDateRemarks())
                        .build()
                : project.getEndDate());

        project.setPartnersOrFunders((newProjectForm.getPartnersOrFunders() != null && !newProjectForm.getPartnersOrFunders().isEmpty()) ?
                newProjectForm.getPartnersOrFunders()
                : new ArrayList<>(Collections.singletonList("None")));

        project.setProjectAmount((newProjectForm.getAmount() != null) ?
                ProjectAmount.builder()
                        .amount(newProjectForm.getAmount())
                        .remarks(newProjectForm.getAmountRemarks())
                        .build()
                : project.getProjectAmount());

        project.setPrincipalProponent((newProjectForm.getPrincipalProponent() != null && !newProjectForm.getPrincipalProponent().isEmpty()) ?
                newProjectForm.getPrincipalProponent()
                : new ArrayList<>(Collections.singletonList("None")));

        project.setStatus(newProjectForm.getStatus());

        project.setProjectRemarks((newProjectForm.getRemarks() != null && !newProjectForm.getRemarks().isEmpty()) ?
                newProjectForm.getRemarks()
                : new ArrayList<>(Collections.singletonList("None")));

        return projectRepository.save(project);
    }

    @Override
    public boolean delete(Long id) {
        Project project = retrieve(id);

        projectRepository.deleteById(project.getId());

        Optional<Project> optionalProject = projectRepository.findById(id);

        return optionalProject.isEmpty();
    }

    @Override
    public Project dtoToEntity(NewProjectForm newProjectForm) {
       return Project.builder()
                .leadUnit(newProjectForm.getLeadUnit())
                .title(newProjectForm.getTitle())
                .schoolYear(SchoolYear.builder()
                        .startYear(newProjectForm.getSchoolYearStart())
                        .endYear(newProjectForm.getSchoolYearEnd())
                        .build())
                .startDate(ProjectDate.builder()
                        .date(newProjectForm.getStartDate())
                        .remarks(newProjectForm.getStartDateRemarks())
                        .build())
                .endDate(ProjectDate.builder()
                        .date(newProjectForm.getEndDate())
                        .remarks(newProjectForm.getEndDateRemarks())
                        .build())
                .partnersOrFunders(newProjectForm.getPartnersOrFunders())
                .projectAmount(ProjectAmount.builder()
                        .amount(newProjectForm.getAmount())
                        .remarks(newProjectForm.getAmountRemarks())
                        .build())
                .principalProponent(newProjectForm.getPrincipalProponent())
                .status(newProjectForm.getStatus())
                .projectRemarks(newProjectForm.getRemarks())
                .build();
    }

    @Override
    public ProjectDTO entityToDTO(Project project) {

        return ProjectDTO.builder()
                .id(project.getId())
                .leadUnit(project.getLeadUnit())
                .schoolYear(project.getSchoolYear().toString())
                .startDate(project.getStartDate().getFormattedDate())
                .startDateRemarks(project.getStartDate().getRemarks())
                .endDate(project.getEndDate().getFormattedDate())
                .endDateRemarks(project.getEndDate().getRemarks())
                .partnersOrFunders(project.getPartnersOrFunders())
                .amount(project.getProjectAmount().getAmount())
                .amountRemarks(project.getProjectAmount().getRemarks())
                .principalProponent(project.getPrincipalProponent())
                .status(project.getStatus())
                .remarks(project.getProjectRemarks())
                .build();
    }


    private Long extractStartYear(String schoolYear) {
        // Assuming the School Year string format is "S.Y {startYear}-{endYear}"
        String[] parts = schoolYear.split(" ");
        String yearRange = parts[1];
        String startYearString = yearRange.split("-")[0];
        return Long.parseLong(startYearString);
    }
}
