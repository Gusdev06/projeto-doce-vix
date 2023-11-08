import styled from "styled-components";
import variables from "../../styles/variables";
import { Botao } from "../../styles";
import { ModalStyle } from "../CardFood/styles";

export const ModalStyleLogin = styled(ModalStyle)`
    display: flex;
    flex-direction: column;
    padding: 32px;

    gap: 16px;

    form {
        display: contents;
    }

    h1 {
        text-align: center;
        margin: 12px;
    }

    p {
        text-align: center;
        color: ${variables.corPrincipal};

        span {
            color: ${variables.verdeClaro}
        }
    }
`
export const BotaoLoginHeader = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: transparent;
    
    margin: 16px;
    padding: 6px;

    cursor: pointer;
    border: none;
    border-radius: 5px;

    font-size: 14px;
    font-weight: bold;

    transition: all 0.3s ease;
    &:hover {
        background-color: #c2c2c2;
    }
`

export const BotaoLogar = styled(Botao)`
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