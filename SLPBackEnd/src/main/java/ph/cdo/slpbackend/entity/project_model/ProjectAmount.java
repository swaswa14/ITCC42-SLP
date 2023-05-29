package ph.cdo.slpbackend.entity.project_model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.Digits;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;
import java.util.Objects;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ProjectAmount {

    @DecimalMax(value = "999999999.99", inclusive = true)
    @Digits(integer = 9, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "#0.00")
    @PositiveOrZero
    private Double amount;
    @ElementCollection
    private List<String> remarks;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProjectAmount other = (ProjectAmount) o;

        return Objects.equals(amount, other.amount);
    }

    @Override
    public int hashCode() {
        return amount != null ? amount.hashCode() : 0;
    }
}
