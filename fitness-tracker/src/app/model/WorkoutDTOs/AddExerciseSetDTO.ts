import { CreateExerciseSetDTO } from '../ExerciseSetDTOs/CreateExerciseSetDTO';

export interface AddExerciseSetDTO {
  workoutId: number;
  createExerciseSetDTO: CreateExerciseSetDTO;
}
