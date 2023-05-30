package ph.cdo.slpbackend.entity.project_model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class ProjectDateDTO {
    private String date;
    private String remarks;

    public ProjectDateDTO(ProjectDate projectDate) {
        this.date = projectDate.getFormattedDate();
        this.remarks = projectDate.getRemarks();
    }
}
