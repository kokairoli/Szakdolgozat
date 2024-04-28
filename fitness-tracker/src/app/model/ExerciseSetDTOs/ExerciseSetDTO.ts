import { ExerciseDTO } from '../ExerciseDTOs/ExerciseDTO';

export interface ExerciseSetDTO {
  id: number;
  numberOfReps: number;
  numberOfSets: number;
  exercise: ExerciseDTO;
}
