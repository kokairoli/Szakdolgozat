package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Role {
    USER,
    ADMIN;
}
