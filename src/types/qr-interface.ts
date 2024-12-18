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
