import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "types";

interface IAuthContext {
    user: IUser;
    setUser: (user: IUser) => void;
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

export const AuthProvider = (props: IAuthProvider) => {
    const { children } = props;

    const [user, setUser] = useState<IUser>({} as IUser);

    // useEffect(() => {
    //     if (user.id === undefined) {
    //         navigate("/login")
    //     }
    // }, [user])

    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    );
};