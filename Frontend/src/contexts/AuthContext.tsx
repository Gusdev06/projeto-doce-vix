import Cookies from "js-cookie";
import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api/api";

type User = {
  userId: number;
  email: string;
  role: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const getToken = Cookies.get("token");

    if (getToken) {
      const { userId, email, role } = JSON.parse(atob(getToken.split(".")[1]));

      setUser({
        userId,
        email,
        role,
      });

      console.log(userId);
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("login", {
        email,
        password,
      });

      const { role, userId, token } = response.data;

      Cookies.set("token", token, { expires: 20 });

      setUser({
        userId,
        email,
        role,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
