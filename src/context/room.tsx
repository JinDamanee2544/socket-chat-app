import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { IAuth, IRoom } from "types";
import apiClient from "utils/apiClient";

interface IRoomContext {
    room: IRoom[];
    setRoom: (room: IRoom[]) => void;
    updateRoom: (user: IAuth) => void;
    clearRoom: () => void;
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
        const respDMLoading = apiClient.get('/ws/getDMs', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        const respLoading = Promise.all([respRoomLoading, respDMLoading])
        respLoading.then(resp => {
            const rooms: IRoom[] = resp[0].data;
            const dms: IRoom[] = resp[1].data;
            setRoom([...rooms, ...dms])
        }).catch(err => {
            console.log(err)
            toast.error('Failed to update rooms')
        })
    }
    const clearRoom = () => {
        setRoom([])
    }

    return (
        <roomContext.Provider value={{ room, setRoom, updateRoom, clearRoom }}>
            {children}
        </roomContext.Provider>
    );
};

export default RoomProvider;