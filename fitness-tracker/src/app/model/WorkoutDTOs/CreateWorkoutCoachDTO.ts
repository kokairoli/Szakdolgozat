import { CreateExerciseSetDTO } from '../ExerciseSetDTOs/CreateExerciseSetDTO';

export interface CreateWorkoutCoachDTO {
  userId: number;
  name: string;
  comment: string;
  scheduled: string;
  createWorkoutSetDTOList: Array<CreateExerciseSetDTO>;
}
