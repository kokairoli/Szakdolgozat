package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;

public enum Difficulty {
    ADVANCED("Advanced"),
    BEGINNER("Beginner"),
    EXPERT("Expert"),
    GRANDMASTER("Grand Master"),
    INTERMEDIATE("Intermediate"),
    LEGENDARY("Legendary"),
    MASTER("Master"),
    NOVICE("Novice");

    private String name;

    Difficulty(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
