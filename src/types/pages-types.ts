import { IQRCode, qrCodeSchema } from '@/types/qr-types';
import { userOutputSchema } from '@/types/user-types';
import { z } from 'zod';

export interface IPage {
  id: string;
  name: string;
  description: string;
  openingHours: string | null;
  location?: ILocation | null;
  backgroundUrl: string | null;
  logoUrl: string | null;
  favicon: string | null;
  defaultLangId: string;
  pathname: string;
  defaultLang: ILanguage;
  translations: IPageTranslation[];
  createdAt: Date;
  updatedAt: Date;
  qrCodes: IQRCode[];
}

export interface ILocation {
  id: string;
  country: string;
  city?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  googleUrl?: string | null;
}

export const locationSchema = z.object({
  id: z.string(),
  country: z.string(),
  address: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  googleUrl: z.string().nullable(),
  pageId: z.string().nullable(),
});

export interface ILanguage {
  id: string;
  code: string;
  name: string;
  nativeName: string;
}

export const languageSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  nativeName: z.string(),
});

export interface IPageTranslation {
  id: string;
  pageId: string;
  langId: string;
  name: string;
  currency: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PagePanelTabsEnum {
  SEO = 'SEO',
  LOCATION = 'LOCATION',
  PHOTOS = 'PHOTOS',
  DESCRIPTION = 'DESCRIPTION',
}

export const pageTranslationSchema = z.object({
  id: z.string(),
  pageId: z.string(),
  langId: z.string(),
  name: z.string(),
  description: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const pageSchema = z.object({
  id: z.string(),
  openingHours: z.string().nullable(),
  location: locationSchema.nullable(),
  backgroundUrl: z.string().nullable(),
  favicon: z.string().nullable(),
  pathname: z.string(),
  name: z.string(),
  description: z.string(),
  logoUrl: z.string().nullable(),
  defaultLangId: z.string(),
  defaultLang: languageSchema,
  translations: z.array(pageTranslationSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  qrCodes: z.array(qrCodeSchema),
  ownerId: z.string(),
  owner: userOutputSchema,
});
