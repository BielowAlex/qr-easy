import { z } from 'zod';

export interface IQRCode {
  id: string;
  value: string;
  imageBase64: string;
  title: string;
  ownerId: string;
  createdAt: Date;
}

export interface ICreateQrBody {
  title: string;
  value: string;
  imageBase64: string;
}

export const qrCodeSchema = z.object({
  id: z.string(),
  value: z.string(),
  imageBase64: z.string(),
  title: z.string(),
  ownerId: z.string(),
  pageId: z.string().nullable(),
  createdAt: z.date(),
});
