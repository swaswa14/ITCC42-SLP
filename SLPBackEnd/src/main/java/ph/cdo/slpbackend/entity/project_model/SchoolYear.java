package ph.cdo.slpbackend.entity.project_model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class SchoolYear {

    @NotNull
    @PositiveOrZero
    @Size(min = 4, max = 4)
    private Long startYear;

    @NotNull
    @PositiveOrZero
    @Size(min = 4, max = 4)
    private Long endYear;

    @Override
    public String toString() {
        return "S.Y " + startYear + "-" + (endYear % 100);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SchoolYear other = (SchoolYear) o;

        // Compare startYear and endYear in descending order
        return other.startYear.equals(startYear) && other.endYear.equals(endYear);
    }

    @Override
    public int hashCode() {
        // Hash based on startYear and endYear in descending order
        return Objects.hash(startYear, endYear);
    }
}
