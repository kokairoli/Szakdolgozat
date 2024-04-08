package tech.fitnesstackerbackend.fitnesstrackerbackend.model.comment;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AddCommentDTO {
    private Long id;

    private String comment;
}
