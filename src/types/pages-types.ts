import { IQRCode } from '@/types/qr-types';

export interface IPage {
  id: string;
  openingHours: string | null;
  location?: ILocation | null;
  backgroundUrl: string | null;
  logoUrl: string | null;
  defaultLangId: string;
  defaultLang: ILanguage;
  translations: IPageTranslation[];
  createdAt: Date;
  updatedAt: Date;
  qrCodes: IQRCode[];
}

export interface ILocation {
  id: string;
  country: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  googleUrl?: string | null;
}

export interface ILanguage {
  id: string;
  code: string;
  name: string;
  nativeName: string;
}

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
