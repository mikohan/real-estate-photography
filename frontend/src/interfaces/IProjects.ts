export interface IProject {
  data: IData;
  meta: Meta;
}

export interface IData {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  title: string;
  date?: Date;
  virtual_tour?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  photo?: Photo;
  video?: Photo;
}

export interface Photo {
  data: ProjectDatum[];
}

export interface ProjectDatum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  name: string;
  alternativeText?: string | undefined;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export enum EXT {
  Jpg = '.jpg'
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
  ext: EXT;
  mime: MIME;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export enum MIME {
  ImageJPEG = 'image/jpeg'
}

export interface Meta {}
