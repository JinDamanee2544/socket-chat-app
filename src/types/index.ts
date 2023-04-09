export type Message = {
    id: number;
    text: string;
    author: User;
}

export type Room = {
    id: number;
    name: string;
}

export type User = {
    id: number;
    name: string;
    image: string;
}