export interface PostType {
    id:number;
    name:string;
}


export interface FormData {
    image: File | null;
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
