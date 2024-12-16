export interface IUser {
  id: string;
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  isOnline: boolean;
  authUserId: string | null;
}
