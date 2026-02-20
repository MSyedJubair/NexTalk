import { useQuery } from "@tanstack/react-query"
import { checkAuth, getMessages, getUser, getUsers } from "./api"

export const useGetAuthStatus = () => {
    return useQuery({
        queryKey: ['getAuthStatus'],
        queryFn: checkAuth
    })
}

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ['getCurrentUser'],
        queryFn: getUser
    })
}

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ['getAllUsers'],
        queryFn: getUsers
    })
}

export const useGetMessages = (userId:string) => {
    return useQuery({
        queryKey: ['getMessages', userId],
        queryFn: () => getMessages(userId),
        enabled: !!userId, // ✅ VERY IMPORTANT
    })
}