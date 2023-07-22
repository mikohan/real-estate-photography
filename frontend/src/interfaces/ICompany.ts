export interface ICompany {
  data: ICompanyData;
  meta: Meta;
}

export interface ICompanyData {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyBackend: string;
  companyAddress2: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  companyMainPhoto: CompanyMainPhoto;
}

export interface CompanyMainPhoto {
  data: CompanyMainPhotoData;
}

export interface CompanyMainPhotoData {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  thumbnail: Large;
  small: Large;
  medium: Large;
  large: Large;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Meta {}
