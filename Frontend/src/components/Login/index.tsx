import * as S from './styles'
import PersonIcon from '@mui/icons-material/Person';
import { TextField } from '@mui/material'
import { FormEvent, useContext, useState } from "react"
import { AuthContext } from '../../contexts/AuthContext'

const Login = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user } = useContext(AuthContext)
    const { signIn } = useContext(AuthContext)

    console.log(user)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            email,
            password
        }

        await signIn(data)
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <S.divBotao>
                <S.BotaoLoginHeader onClick={openModal}>
                    <PersonIcon />
                    Login
                </S.BotaoLoginHeader>
            </S.divBotao>
            <S.ModalStyleLogin isOpen={modalIsOpen} onRequestClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <TextField value={email} onChange={e => setEmail(e.target.value)} name='email' type='email' id="outlined-basic" label="E-mail" variant="outlined" />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} name='password' type='password' id="outlined-basic" label="Senha" variant="outlined" />
                    <S.BotaoLogar type='submit'>Logar</S.BotaoLogar>
                    <p>Esqueceu a senha?</p>
                    <p>Não possuí uma conta? <span>Criar Conta</span></p>
                </form>
            </S.ModalStyleLogin>
            <h1>Conta - {user?.email}</h1>
        </>
    )
}

export default Login