package ph.cdo.slpbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
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

    @Builder.Default
    private String leadUnit = "None";

    @Builder.Default
    private String title = "None";


    @Embedded
    private SchoolYear schoolYear;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "date", column = @Column(name = "startDate")),
            @AttributeOverride(name = "remarks", column = @Column(name = "startDateRemarks"))
    })
    private ProjectDate startDate;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "date", column = @Column(name = "endDate")),
            @AttributeOverride(name = "remarks", column = @Column(name = "endDateRemarks"))
    })
    private ProjectDate endDate;
    @ElementCollection
    private List<String> partnersOrFunders;

    @Embedded
    private ProjectAmount projectAmount;

    @ElementCollection
    private List<String> principalProponent;

    @Enumerated(EnumType.STRING)
    private Status status;
    @ElementCollection
    private List<String> projectRemarks;



}
