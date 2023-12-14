import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Comida from "../../models/food";

type CarrinhoState = {
  itens: Comida[];
  observacoes: { [itemId: number]: string };
};

const initialState: CarrinhoState = {
  itens: [],
  observacoes: {},
};

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,

  reducers: {
    adicionar: (state, action: PayloadAction<Comida>) => {
      const novaComida = action.payload;
      const comidaExistente = state.itens.find(
        (comida) => comida.id === novaComida.id
      );
      if (
        comidaExistente &&
        comidaExistente.observation === novaComida.observation
      ) {
        comidaExistente.quantity += 1;
      } else {
        state.itens.push(novaComida);

        if (novaComida.observation) {
          state.observacoes[novaComida.id] = novaComida.observation;
        }
      }
    },
    remover: (state, action: PayloadAction<number>) => {
      const idItemARemover = action.payload;
      const indexItemARemover = state.itens.findIndex(
        (comida) => comida.id === idItemARemover
      );

      if (indexItemARemover !== -1) {
        if (state.itens[indexItemARemover].quantity > 1) {
          state.itens[indexItemARemover].quantity -= 1;
        } else {
          state.itens.splice(indexItemARemover, 1);
        }
      }
    },
  },
});

export const { adicionar, remover } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
