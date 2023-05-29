package ph.cdo.slpbackend.entity.project_model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.format.DateTimeFormat;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Objects;

@Embeddable
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDate {
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MMMM yyyy")
    private Date date;

    private String remarks;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProjectDate other = (ProjectDate) o;

        if (!Objects.equals(date, other.date)) return false;
        return Objects.equals(remarks, other.remarks);
    }

    @Override
    public int hashCode() {
        int result = date != null ? date.hashCode() : 0;
        result = 31 * result + (remarks != null ? remarks.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ProjectDate{" +
                "date=" + getFormattedDate() +
                ", remarks='" + remarks + '\'' +
                '}';
    }

    public String getFormattedDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("MMMM yyyy");
        return formatter.format(date);
    }

}
