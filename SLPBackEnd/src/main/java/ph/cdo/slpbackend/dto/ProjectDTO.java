package ph.cdo.slpbackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;
import ph.cdo.slpbackend.entity.project_model.Status;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.Digits;
import javax.validation.constraints.PositiveOrZero;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectDTO {

    private Long id;
    private String leadUnit;

    private Integer number;

    private String schoolYear;


    private String startDate;
    private String startDateRemarks;

    private String endDate;
    private String endDateRemarks;

    private List<String> partnersOrFunders;

    @DecimalMax(value = "999999999.99", inclusive = true)
    @Digits(integer = 9, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "#0.00")
    @PositiveOrZero
    private Double amount;
    private List<String> amountRemarks;

    private List<String> principalProponent;

    @Enumerated(EnumType.STRING)
    private Status status;

    private List<String> remarks;

}
