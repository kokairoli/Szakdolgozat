import { UserDTO } from '../UserDTOs/UserDTO';

export interface CoachingRequestDTO {
  id: number;
  active: boolean;
  accepted: boolean;
  message: string;
  userDTO: UserDTO;
}
