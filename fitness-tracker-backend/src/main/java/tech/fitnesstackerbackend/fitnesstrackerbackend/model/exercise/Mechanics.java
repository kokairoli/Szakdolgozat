package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;

public enum Mechanics {
    COMPOUND("Compound"),
    ISOLATION("Isolation");

    private String name;

    Mechanics(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
