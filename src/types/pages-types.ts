export interface IPage {
  id: string;
  openingHours: string | null;
  locationId?: string | null;
  location?: ILocation | null;
  backgroundUrl: string | null;
  logoUrl: string | null;
  currency: string;
  defaultLangId: string;
  defaultLang: ILanguage;
  translations: IPageTranslation[];
  createdAt: Date;
  updatedAt: Date;
  qrCodes: IQRCode[];
}

export interface ILocation {
  id: string;
  address: string;
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
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQRCode {
  id: string;
  value: string;
  imageBase64: string;
  title: string;
  ownerId: string;
  pageId?: string | null;
  createdAt: Date;
}
