package ph.cdo.slpbackend.controller;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ph.cdo.slpbackend.dto.ProjectDTO;
import ph.cdo.slpbackend.entity.Project;
import ph.cdo.slpbackend.form.NewProjectForm;
import ph.cdo.slpbackend.service.ProjectService;

import java.util.*;

@RestController
@RequestMapping("/api/v1/project")
@CrossOrigin
@AllArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping(value = "/test")
    private String testController(){
        return "Test Controller At ProjectController Class";
    }

    @PostMapping(value = "/create",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> create(@RequestBody NewProjectForm newProjectForm){
        var objectMap = new HashMap<String, Object>();
        Project project = projectService.create(newProjectForm);

        if(project != null){
            objectMap.put("message", "Project created!");
            objectMap.put("id", project.getId());
            objectMap.put("status", 200);

            return ResponseEntity.ok(objectMap);
        }else{
            objectMap.put("message", "Project creation failed!");

            return ResponseEntity.badRequest().body(objectMap);
        }

    }


    @PutMapping(value= "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody NewProjectForm newProjectForm){
        var objectMap = new HashMap<String, Object>();

        Project project = projectService.update(id, newProjectForm);


        if(project != null){
            objectMap.put("message", "Project updated!");
            objectMap.put("id", project.getId());
            objectMap.put("status", 200);

            return ResponseEntity.ok(objectMap);
        }else{
            objectMap.put("message", "Project update failed!");

            return ResponseEntity.badRequest().body(objectMap);
        }

    }


    @GetMapping(value = "/mapped_projects")
    public ResponseEntity<Map<String, Object>> getMapped(){
        var mappedObject = projectService.retrieveMappedProjects();
        var arrayMappedObject = new ArrayList<Map<String,Object>>();
        for (Map.Entry<String, List<ProjectDTO>> entry : mappedObject.entrySet()) {
            Map<String, Object> map = new TreeMap<>(Comparator.reverseOrder());
            map.put("projects", entry.getValue());
            map.put("schoolYear", entry.getKey());

            arrayMappedObject.add(map);
        }
        Map<String, Object> temp = new HashMap<>();
        temp.put("all", arrayMappedObject);
        return ResponseEntity.ok(temp);
    }

    @GetMapping(value="/all")
    public ResponseEntity<Map<String,Object>> getAll(){
        var mappedObject = new HashMap<String, Object>();
        var listDTO = projectService.retrieve();
        mappedObject.put("all", listDTO);
        return ResponseEntity.ok(mappedObject);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id){
        var objectMap = new HashMap<String, Object>();
        boolean result = projectService.delete(id);

        if(result){
            objectMap.put("message", "Project deleted!");
            objectMap.put("id", id);
            objectMap.put("status", 200);
            return ResponseEntity.ok(objectMap);
        }else{
            objectMap.put("message", "Project deletion failed!");

            return ResponseEntity.badRequest().body(objectMap);
        }
    }
}
