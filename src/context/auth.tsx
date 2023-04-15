import { createContext, useContext, useEffect, useState } from "react";
import { IAuth } from "types";

interface IAuthContext {
    user: IAuth;
    setUser: (user: IAuth) => void;
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

    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;