export interface ISocial {
  data: ISocialDatum[];
  meta: Meta;
}

export interface ISocialDatum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  link: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
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
