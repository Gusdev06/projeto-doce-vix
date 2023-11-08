import { ReactNode, createContext, useEffect, useState } from "react"
import { api } from "../services/api/api"
import Cookies from 'js-cookie'

type User = {
    email: string,
    role: string,
    userId: number
}

type SignInCredentials = {
    email: string
    password: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    user: User | undefined
    isAuthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user

    useEffect(() => {
        const getToken = Cookies.get('token')

        if (getToken) {
            api.get('/').then(response => {
                const { email, role, userId } = response.data
                
                setUser({ email, role, userId })
            })
        }
    }, [])

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('login', {
                email,
                password
            })

            const { role, userId, token } = response.data

            Cookies.set('token', token, { expires: 30 })

            setUser({
                email,
                role,
                userId
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            console.log(user)


        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}