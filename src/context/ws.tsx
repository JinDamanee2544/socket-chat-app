import { createContext, useContext, useState } from "react";
import { Conn } from "types";

interface IWebSocketContext {
    conn: Conn;
    setNewConn: (conn: Conn) => void;
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
    // const { user } = useAuth();
    // const [connList, setConnList] = useState<connDict>({});

    // const switchToConn = (roomId: number) => {
    //     if (connList[roomId]) {
    //         setConn(connList[roomId])
    //     }
    //     const ws = new WebSocket(`ws://localhost:8080/ws/joinRoom/${roomId}`, user.accessToken);
    //     setConn(ws)
    // }

    const setNewConn = (newConn: Conn) => {
        console.log(conn?.url, '--->', newConn?.url);
        conn?.close()
        setConn(newConn)
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