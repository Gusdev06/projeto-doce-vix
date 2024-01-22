import Cookies from "js-cookie";
import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api/api";

type User = {
  userId: number;
  role: string;
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
  loginError: string | null;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const getToken = Cookies.get("token");

    if (getToken) {
      const { userId, role, email } = JSON.parse(atob(getToken.split(".")[1]));

      setUser({
        userId,
        role,
        email,
      });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("login", {
        email,
        password,
      });

      const { userId, role, token } = response.data;

      Cookies.set("token", token, { expires: 20 });

      setUser({
        userId,
        role,
        email,
      });

      setLoginError(null);
    } catch (err) {
      setLoginError("Credenciais inválidas. Verifique seu e-mail e senha.");
      console.log(err);
    }
  }

  const signUp = async ({ name, email, password }: SignUpCredentials) => {
    try {
      await api.post("users/register", {
        name,
        email,
        password,
      });

      setLoginError(null);

      await signIn({ email, password });
    } catch (err) {
      setLoginError(
        "Erro ao cadastrar o usuário. Verifique os dados fornecidos."
      );
      console.log(err);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, user, loginError, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
