export type IMessage = {
    roomId: number;
    username : string;
    senderId: number;
    content: string;
}

export type IRoom = {
    id: number;
    name: string;
    clients: number[]; // user ids
}

export type IUser = {
    id: number;
    username: string;
    accessToken: string;
}