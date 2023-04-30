import { createContext, useContext, useState } from "react";
import { Conn } from "types";
import { useAuth } from "./auth";
import { VITE_BACKEND_BASE_URL } from 'utils/apiClient'

interface IWebSocketContext {
    conn: Conn;
    setNewConn: (roomId: number) => void;
    clearConn: () => void;
}

const WebSocketContext = createContext<IWebSocketContext>({} as IWebSocketContext);

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within an WebSocketProvider");
    }
    return context
}

interface IWebSocketProvider {
    children: React.ReactNode;
}


const WebSocketProvider = (props: IWebSocketProvider) => {
    const { children } = props;
    const [conn, setConn] = useState<Conn>(null);
    const { user } = useAuth();

    const setNewConn = (roomId: number) => {
        const newWsConn = new WebSocket(`ws://${VITE_BACKEND_BASE_URL}/ws/joinRoom/${roomId}`, user.accessToken);
        console.log(conn?.url, '--->', newWsConn?.url);
        conn?.close()
        setConn(newWsConn)
    }

    const clearConn = () => {
        conn?.close()
        setConn(null)
    }

    return (
        <WebSocketContext.Provider value={{
            conn,
            setNewConn,
            clearConn
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;