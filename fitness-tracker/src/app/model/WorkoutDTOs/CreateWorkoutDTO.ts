import { CreateExerciseSetDTO } from '../ExerciseSetDTOs/CreateExerciseSetDTO';

export interface CreateWorkoutDTO {
  name: string;
  comment: string;
  createWorkoutSetDTOList: Array<CreateExerciseSetDTO>;
}
