import { CreateExerciseSetDTO } from '../ExerciseSetDTOs/CreateExerciseSetDTO';

export interface CreateWorkoutCoachDTO {
  userId: number;
  name: string;
  comment: string;
  createWorkoutSetDTOList: Array<CreateExerciseSetDTO>;
}
