export interface PostType {
  id: number;
  name: string;
}

export interface FormDataEnum {
  image: string | null;
  name: string;
  description: string;
  price: number;
  author: string;
  genres: string[];
}

export interface Genre {
  id: string;
  name: string;
}

export type CoolFile = {
  base64: string | null;
  filetype?: string;
  size?: number;
  filename?: string;
};
