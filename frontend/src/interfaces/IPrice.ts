export interface IPrice {
  data: IPriceDatum[];
  meta: Meta;
}

export interface IPriceDatum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  value: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
  alternativeText: null | string;
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
  large: Large;
  medium: Large;
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

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
