import CardFood from "../../components/CardFood";

import * as I from "@mui/icons-material";
import * as M from "@mui/material";
import { useContext } from "react";
// import Footer from "../../components/footer";
import DishContext from "../../contexts/dishContext";
import Comida from "../../models/food";
import * as S from "./styles";
import Carrinho from "../../components/Carrinho";

function agruparPorCategoria(pratos: Comida[]): Record<string, Comida[]> {
  return pratos.reduce((categorias, prato) => {
    const categoria = prato.category ? prato.category.name : "Outros";
    if (!categorias[categoria]) {
      categorias[categoria] = [];
    }
    categorias[categoria].push(prato);
    return categorias;
  }, {} as Record<string, Comida[]>);
}

const Cardapio: React.FC = () => {
  const { dish } = useContext(DishContext);
  const pratosPorCategoria = agruparPorCategoria(dish);

  return (
    <>
      {Object.entries(pratosPorCategoria).map(([categoria, pratos]) => (
        <M.Accordion key={categoria} defaultExpanded={true}>
          <M.AccordionSummary
            expandIcon={<I.ExpandMore />}
            id={`panel-${categoria}`}
          >
            <M.Typography>
              <S.Icon src="https://cdn.discordapp.com/attachments/1101908244559048736/1149044327713095740/bandeja-de-comida.png" />
              {categoria}
            </M.Typography>
          </M.AccordionSummary>
          <M.AccordionDetails>
            <M.Typography>
              <S.TabPanelFoods>
                {pratos.map((prato) => (
                  <CardFood
                    key={prato.id}
                    id={prato.id}
                    name={prato.name}
                    price={prato.price}
                    description={prato.description}
                    quantity={1}
                  />
                ))}
              </S.TabPanelFoods>
            </M.Typography>
          </M.AccordionDetails>
        </M.Accordion>
      ))}
      <Carrinho />
    </>
  );
};

export default Cardapio;
