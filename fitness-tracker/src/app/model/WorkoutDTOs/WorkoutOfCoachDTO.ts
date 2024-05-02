import { ExerciseSetDTO } from '../ExerciseSetDTOs/ExerciseSetDTO';

export interface WorkoutOfCoachDTO {
  id: number;
  name: string;
  comment: string;
  clientId: number;
  finished: boolean;
  sets: Array<ExerciseSetDTO>;
  scheduled: string;
}
