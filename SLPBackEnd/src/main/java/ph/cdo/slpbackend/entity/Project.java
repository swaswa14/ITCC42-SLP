package ph.cdo.slpbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ph.cdo.slpbackend.entity.project_model.ProjectAmount;
import ph.cdo.slpbackend.entity.project_model.ProjectDate;
import ph.cdo.slpbackend.entity.project_model.SchoolYear;
import ph.cdo.slpbackend.entity.project_model.Status;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    @SequenceGenerator(
            name = "project_sequence",
            sequenceName = "project_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "project_sequence"
    )
    private Long id;


    @Embedded
    private SchoolYear schoolYear;

    @Embedded
    private ProjectDate startDate;
    @Embedded
    private ProjectDate endDate;
    @ElementCollection
    private ArrayList<String> partnerOrFunder;

    @Embedded
    private ProjectAmount projectAmount;

    private String principalProponent;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String projectRemarks;

}
