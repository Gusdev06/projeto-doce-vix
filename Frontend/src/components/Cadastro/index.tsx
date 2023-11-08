import * as S from './styles'
import { TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from "react"
import { registerUser } from '../../services/api/userApi'

export type FormData = {
    name: string,
    email: string,
    password: string
}

const Cadastro = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const response = await registerUser(formData)
            console.log('Usuário cadastrado com sucesso!', response)
        } catch (error) {
            console.log('Erro ao cadastrar o usuario', error)
        }
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
                <S.BotaoCadastroHeader onClick={openModal}>Cadastro</S.BotaoCadastroHeader>
            </S.divBotao>
            <S.ModalStyleRegister isOpen={modalIsOpen} onRequestClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>
                    <TextField value={formData.name} onChange={handleInputChange} name='name' type='text' id="outlined-basic" label="Nome" variant="outlined" />
                    <TextField value={formData.email} onChange={handleInputChange} name='email' type='email' id="outlined-basic" label="E-mail" variant="outlined" />
                    <TextField value={formData.password} onChange={handleInputChange} name='password' type='password' id="outlined-basic" label="Senha" variant="outlined" />
                    <S.BotaoCadastrar type='submit'>Cadastrar</S.BotaoCadastrar>
                </form>
            </S.ModalStyleRegister>
        </>
    )
}

export default Cadastro