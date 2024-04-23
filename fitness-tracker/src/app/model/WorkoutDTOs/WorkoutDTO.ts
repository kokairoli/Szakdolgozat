import { ExerciseSetDTO } from '../ExerciseSetDTOs/ExerciseSetDTO';
import { UserDTO } from '../UserDTOs/UserDTO';

export interface WorkoutDTO {
  id: number;
  name: string;
  comment: string;
  coachWorkout: boolean;
  finished: boolean;
  sets: Array<ExerciseSetDTO>;
  coach: UserDTO;
}
