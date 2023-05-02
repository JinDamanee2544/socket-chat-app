import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { IAuth, IUser } from "types";
import apiClient from "utils/apiClient";

interface IClientContext {
    client: IUser[];
    setClient: (user: IUser[]) => void;
    updateClient: (user: IAuth) => void;
    clearClient: () => void;
    getParticipants: (participants: number[]) => IUser[];
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

    const clearClient = () => {
        setClient([])
    }

    const getUserById = (id: number): IUser => {
        const user = client.filter(user => user.id === id)[0]
        // if (!user) throw new Error('User not found')
        return user
    }

    const getParticipants = (participants: number[]): IUser[] => {
        const users = participants.map(participant => getUserById(participant))
        return users
    }

    return (
        <ClientContext.Provider value={{ client, setClient, updateClient, clearClient, getParticipants }}>
            {children}
        </ClientContext.Provider>
    );
};

export default ClientProvider;


