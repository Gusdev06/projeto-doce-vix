import { useState } from "react";
import { adicionar } from "../../store/reducers/carrinho";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import Comida from "../../models/food";
import * as S from "./styles";
Modal.setAppElement("#root");

export type Props = Comida;

const CardFood = ({
  id,
  description,
  name,
  price,
  quantity,
  observation,
}: Props) => {
  const dispatch = useDispatch();
  const [observacao, setObservacao] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const AbrirModal = () => {
    setIsOpen(true);
  };

  const FecharModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <S.Card onClick={AbrirModal}>
        <S.ImgCard src="https://imgur.com/a/dGRXdxR" />
        <S.DivInfos>
          <label htmlFor={name}>{name}</label> <br />
          <p>{description}</p>
          <S.Preco>
            <span>R${price}</span>
          </S.Preco>
        </S.DivInfos>
      </S.Card>
      <S.ModalStyle isOpen={modalIsOpen} onRequestClose={FecharModal}>
        <S.ModalDiv>
          <S.DivImg>
            <div>
              <S.BiDishStyle />
              <S.FiXStyle onClick={FecharModal} />
            </div>
            <S.ImgCardModal src="https://imgur.com/a/dGRXdxR" />
          </S.DivImg>
          <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Observações (opcional)"
            />
          </div>
        </S.ModalDiv>
        <S.DivButtons>
          <S.BotaoAdicionar
            type="button"
            onClick={() => {
              dispatch(
                adicionar({
                  name,
                  description,
                  price,
                  id,
                  quantity: 1,
                  observation: observacao,
                })
              );
              toast.success(`Item adicionado ao carrinho :D`, {
                position: toast.POSITION.BOTTOM_LEFT,
              });
              setObservacao("");
            }}
          >
            <S.ImPlusStyle />
            Adicionar
            <div>R${price}</div>
          </S.BotaoAdicionar>
        </S.DivButtons>
      </S.ModalStyle>
    </>
  );
};

export default CardFood;
