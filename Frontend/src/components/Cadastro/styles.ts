import styled from 'styled-components'
import { ModalStyleLogin } from '../Login/styles'
import { Botao } from '../../styles'
import variables from '../../styles/variables'

export const ModalStyleRegister = styled(ModalStyleLogin)``

export const BotaoCadastroHeader = styled.button`
background-color: ${variables.verdeClaro};
`

export const BotaoCadastrar = styled(Botao)`
    background-color: ${variables.verdeClaro};
    font-weight: bold;
    font-size: 14px;
    transition: all 0.15s ease;
    

    &:hover {
        background-color: ${variables.verdeEscuro};
    }
`


export const divBotao = styled.div`
display: flex;
justify-content: end;
`