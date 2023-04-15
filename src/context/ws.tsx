import { createContext, useContext, useState } from "react";
import { Conn } from "types";

interface IWebSocketContext {
    conn: Conn;
    setConn: (conn: Conn) => void;
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

    return (
        <WebSocketContext.Provider value={{
            conn,
            setConn
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;