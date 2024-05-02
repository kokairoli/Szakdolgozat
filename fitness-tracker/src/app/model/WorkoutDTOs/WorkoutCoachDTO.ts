import { UserDTO } from '../UserDTOs/UserDTO';
import { WorkoutOfCoachDTO } from './WorkoutOfCoachDTO';

export interface WorkoutCoachDTO {
  client: UserDTO;
  workouts: Array<WorkoutOfCoachDTO>;
}
