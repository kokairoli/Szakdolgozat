package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
public class WeightDTO {
    private Double weight;
    private LocalDate recordedAt;
}
