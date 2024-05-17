import { SocialProfile } from 'src/core/domain/dto/UserClassDto';

export class GetAllUsersResponse {
  id: number;
  name: string;
  role: number;
  status: number;
  socialProfile: SocialProfile[];
  promote_status: boolean;
  rating: string;
  login_at: Date;
  created_at: Date;
  updated_at: Date;
}
