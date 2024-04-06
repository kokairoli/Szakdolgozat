package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;

public enum Mechanics {
    TEST("TEST");

    private String name;

    Mechanics(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
