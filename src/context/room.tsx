import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IAuth, IRoom } from "types";
import apiClient from "utils/apiClient";

interface IRoomContext {
    room: IRoom[];
    setRoom: (room: IRoom[]) => void;
    updateRoom: (user: IAuth) => void;
}

const roomContext = createContext<IRoomContext>({} as IRoomContext);

export const useRoom = () => {
    const context = useContext(roomContext);
    if (!context) {
        throw new Error("useRoom must be used within an RoomProvider");
    }
    return context
}

interface IRoomProvider {
    children: React.ReactNode;
}

const RoomProvider = (props: IRoomProvider) => {
    const { children } = props;
    const [room, setRoom] = useState<IRoom[]>([]);

    const updateRoom = (user: IAuth) => {
        const respRoomLoading = apiClient.get('/ws/getRooms', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        respRoomLoading.then(resp => {
            const rooms: IRoom[] = resp.data;
            setRoom(rooms)
        }).catch(err => {
            console.log(err)
            toast.error('Failed to update rooms')
        })
    }

    return (
        <roomContext.Provider value={{ room, setRoom, updateRoom }}>
            {children}
        </roomContext.Provider>
    );
};

export default RoomProvider;