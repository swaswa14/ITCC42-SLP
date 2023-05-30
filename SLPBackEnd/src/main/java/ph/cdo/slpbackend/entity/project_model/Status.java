package ph.cdo.slpbackend.entity.project_model;

public enum Status {
    Completed,
    Ongoing,
    Postponed;

    public static Status fromString(String statusString) {
        for (Status status : Status.values()) {
            if (status.name().equalsIgnoreCase(statusString)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid Status: " + statusString);
    }
}