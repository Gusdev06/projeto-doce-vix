import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./styles";

export type FormData = {
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [childModalIsOpen, setChildModalIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const { user, signIn, isAuthenticated, loginError, logout, signUp } =
    useContext(AuthContext);
  const [reloadPage, setReloadPage] = useState(false);

  async function handleSubmitLogin(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      await signIn(data);
      setReloadPage(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signUp(formData);
      setReloadPage(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (reloadPage && isAuthenticated) {
      window.location.reload();
    }
  }, [reloadPage, isAuthenticated]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openChildModal = () => {
    closeModal();
    setChildModalIsOpen(true);
  };

  const closeChildModal = () => {
    setChildModalIsOpen(false);
  };

  return (
    <>
      <S.divBotao>
        {isAuthenticated ? (
          <S.BotaoDeslogarHeader onClick={logout}>
            <LogoutIcon />
            Sair
          </S.BotaoDeslogarHeader>
        ) : (
          <S.BotaoLoginHeader onClick={openModal}>
            <PersonIcon />
            Perfil
          </S.BotaoLoginHeader>
        )}
      </S.divBotao>
      <S.ModalStyleLogin isOpen={modalIsOpen} onRequestClose={closeModal}>
        <form onSubmit={handleSubmitLogin}>
          <h1>Login</h1>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            autoComplete="email"
            required
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            autoComplete="current-password"
            required
          />
          <S.BotaoLogar type="submit">Logar</S.BotaoLogar>
          {loginError && <p className="loginError">{loginError}</p>}
          <p>Esqueceu a senha?</p>
          <p>
            Não possuí uma conta?{" "}
            <span onClick={openChildModal}>Clique aqui</span>
          </p>
        </form>
      </S.ModalStyleLogin>
      <S.ModalStyleRegister
        isOpen={childModalIsOpen}
        onRequestClose={closeChildModal}
      >
        <form onSubmit={handleSubmitRegister}>
          <h1>Cadastro</h1>
          <TextField
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            type="text"
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            autoComplete="name"
            required
          />
          <TextField
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            type="email"
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            autoComplete="email"
            required
          />
          <TextField
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            type="password"
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            autoComplete="current-password"
            required
          />
          <S.BotaoCadastrar type="submit">Cadastrar</S.BotaoCadastrar>
          {loginError && <p className="loginError">{loginError}</p>}
        </form>
      </S.ModalStyleRegister>
        {isAuthenticated ? <S.Usuario>Bem-vindo {user?.email.split('@')[0]}</S.Usuario> : ""}
    </>
  );
};

export default Login;
