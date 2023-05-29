package ph.cdo.slpbackend.service;

import ph.cdo.slpbackend.dto.ProjectDTO;
import ph.cdo.slpbackend.entity.Project;
import ph.cdo.slpbackend.form.NewProjectForm;

import java.util.List;
import java.util.Map;

public interface ProjectService {
        Project create(NewProjectForm newProjectForm);

        List<ProjectDTO> retrieve();
        Project retrieve(Long id);

        Map<String, List<ProjectDTO>> retrieveMappedProjects();
        Project update(Long id, NewProjectForm newProjectForm);

        boolean delete(Long id);

        Project dtoToEntity(NewProjectForm newProjectForm);
        ProjectDTO entityToDTO(Project project);


}
