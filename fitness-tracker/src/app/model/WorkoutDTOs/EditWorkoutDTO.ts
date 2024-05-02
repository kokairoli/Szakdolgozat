import { EditExerciseSetDTO } from '../ExerciseSetDTOs/EditExerciseSetDTO';

export interface EditWorkoutDTO {
  id: number;
  clientId?: number;
  name: string;
  comment: string;
  scheduled: string;
  sets: Array<EditExerciseSetDTO>;
  forDeleteSetIds: Array<number>;
}
