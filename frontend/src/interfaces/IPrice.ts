export interface IPrice {
  data: IPriceDatum[];
  meta: Meta;
}

export interface IPriceDatum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  value: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  name: string;
  description: null;
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
