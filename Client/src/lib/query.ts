import { useQuery } from "@tanstack/react-query"
import { checkAuth } from "./api"

export const useGetAuthStatus = () => {
    return useQuery({
        queryKey: ['getAuthStatus'],
        queryFn: checkAuth
    })
}