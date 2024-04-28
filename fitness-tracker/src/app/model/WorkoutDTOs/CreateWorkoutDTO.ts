import { CreateExerciseSetDTO } from '../ExerciseSetDTOs/CreateExerciseSetDTO';

export interface CreateWorkoutDTO {
  name: string;
  comment: string;
  scheduled: string;
  createWorkoutSetDTOList: Array<CreateExerciseSetDTO>;
}
