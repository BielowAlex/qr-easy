import { z } from 'zod';

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

export const userOutputSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  nickname: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  avatar: z.string().url().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isOnline: z.boolean(),
  authUserId: z.string().nullable(),
});
