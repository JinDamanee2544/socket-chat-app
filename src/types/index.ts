export type IMessage = {
    roomId: number;
    username : string;
    senderId: number;
    content: string;
    isAnnouncement?: boolean;
}

export type IRoom = {
    id: number;
    name: string;
    clients: number[]; // user ids
    category: "public" | "private" ;
}

export type IUser = {
    id: number;
    email: string;
    username: string;
}

export type IAuth = {
    id: number;
    email: string;
    username: string;
    accessToken: string
}

export type Conn = WebSocket | null