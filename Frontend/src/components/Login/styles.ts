import styled from "styled-components";
import { Botao } from "../../styles";
import variables from "../../styles/variables";
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
  }

  .loginError {
    color: ${variables.vermelho};
  }

  span {
    cursor: pointer;
    color: ${variables.verdeClaro};
  }
`;
export const BotaoLoginHeader = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: transparent;
  color: #fff;

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
`;

export const BotaoDeslogarHeader = styled(BotaoLoginHeader)``;

export const BotaoLogar = styled(Botao)`
  background-color: ${variables.verdeClaro};
  font-weight: bold;
  font-size: 14px;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${variables.verdeEscuro};
  }
`;

export const divBotao = styled.div`
  display: flex;
  justify-content: end;
`;

export const ModalStyleRegister = styled(ModalStyleLogin)``;

export const BotaoCadastroHeader = styled.button`
  background-color: ${variables.verdeClaro};
`;

export const BotaoCadastrar = styled(Botao)`
  background-color: ${variables.verdeClaro};
  font-weight: bold;
  font-size: 14px;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${variables.verdeEscuro};
  }
`;

export const Usuario = styled.h1 `
  font-size: 15px;
  margin-top: -45px;

  @media (max-width: 767px) {
        font-size: 14px;
        text-align: center;
        margin-top: 15px;
    }
`;
