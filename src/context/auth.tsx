import { createContext, useContext, useEffect, useState } from "react";
import { IAuth } from "types";
import { useRoom } from "./room";
import { useClient } from "./client";

interface IAuthContext {
    user: IAuth;
    setUser: (user: IAuth) => void;
    logout: () => void;
}

const authContext = createContext<IAuthContext>({} as IAuthContext);


interface IAuthProvider {
    children: React.ReactNode;
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}

const authPath = ['/chat', '/profile']

const AuthProvider = (props: IAuthProvider) => {
    const { children } = props;
    const { clearRoom } = useRoom();
    const { clearClient } = useClient();

    const [user, setUser] = useState<IAuth>({} as IAuth);
    useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.href = '/login'
            return;
        }

        if (authPath.includes(window.location.pathname) && !user.id) {
            window.location.href = '/login'
            return;
        }
    }, [user])

    const logout = () => {
        setUser({} as IAuth)
        clearRoom();
        clearClient();
    }

    return (
        <authContext.Provider value={{ user, setUser, logout }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;