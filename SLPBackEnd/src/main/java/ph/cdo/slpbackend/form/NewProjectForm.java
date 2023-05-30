package ph.cdo.slpbackend.form;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;
import ph.cdo.slpbackend.entity.project_model.Status;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewProjectForm {


    private String leadUnit;

    private Long schoolYearStart;


    private String title;
    private Date startDate;
    private String startDateRemarks;

    private Date endDate;
    private String endDateRemarks;

    private ArrayList<String> partnersOrFunders;



    private Double amount;
    private List<String> amountRemarks;

    private List<String> principalProponent;


    private String status;

    private ArrayList<String> remarks;
}
