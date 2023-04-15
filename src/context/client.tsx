import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { IAuth, IUser } from "types";
import apiClient from "utils/apiClient";

interface IClientContext {
    client: IUser[];
    setClient: (user: IUser[]) => void;
    updateClient: (user: IAuth) => void;
}

const ClientContext = createContext<IClientContext>({} as IClientContext);

export const useClient = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error("useClient must be used within an UserProvider");
    }
    return context
}

interface IClientProvider {
    children: React.ReactNode;
}

const ClientProvider = (props: IClientProvider) => {
    const { children } = props;
    const [client, setClient] = useState<IUser[]>([]);

    const updateClient = (user: IAuth) => {
        const respUserLoading = apiClient.get('/users', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
        respUserLoading.then(resp => {
            const clients: IUser[] = resp.data;
            setClient(clients)
        }).catch(err => {
            console.log(err)
            toast.error('Failed to update clients')
        })
    }

    return (
        <ClientContext.Provider value={{ client, setClient, updateClient }}>
            {children}
        </ClientContext.Provider>
    );
};

export default ClientProvider;