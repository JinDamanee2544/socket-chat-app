import apiClient from "./apiClient"
import {toast} from "react-toastify"

interface UserResponse {
    id: number,
    username: string,
    email: string,
}

const getUserById = async (id: number,token:string) => {
    const respLoading = apiClient.get(`/users`,{
        headers:{
            Authorization: `Bearer ${token}`            
        }
    })
    const user = await respLoading.then((resp) => {
        const users:UserResponse[] = resp.data
        return users.find((user) => user.id === id)!
    }).catch((err) => {
        console.log(err)
        toast.error("fetching users failed")
    })
    return user
}

export  default getUserById