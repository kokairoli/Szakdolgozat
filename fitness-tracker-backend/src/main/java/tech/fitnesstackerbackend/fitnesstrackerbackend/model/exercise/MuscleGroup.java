package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;

public enum MuscleGroup {
    ABDOMINALS("Abdominals"),

    GLUTES("Glutes"),
            CHEST("Chest"),

    ADDUCTORS("Adductors"),
            BACK("Back"),

    SHOULDERS("Shoulders"),

            BICEPS("Biceps"),
    HAMSTRINGS("Hamstrings"),
            ABDUCTORS("Abductors"),
    CALVES("Calves"),
            QUADRICEPS("Quadriceps"),

    TRAPEZIUS("Trapezius"),
            FOREARMS("Forearms"),
    TRICEPS("Triceps");

    private String name;

    MuscleGroup(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
