export interface IPackageSet {
  data: IPackageSetDatum[];
  meta: Meta;
}
export interface IPackage {
  data: IPackageSetDatum;
  attributes: PurpleAttributes;
}

export interface IPackageSetDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  priceValue: number;
  prices: Prices;
  image: Image;
}

export interface Image {
  data: ImageDatum;
}

export interface ImageDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  alternativeText: string;
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
  medium: Large;
  large: Large;
  small: Large;
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

export interface Prices {
  data: PricesDatum[];
}

export interface PricesDatum {
  id: number;
  attributes: TentacledAttributes;
}

export interface TentacledAttributes {
  value: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  name: string;
  description: string;
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
