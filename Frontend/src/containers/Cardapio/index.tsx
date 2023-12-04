import axios from "axios";
import { useQuery } from "react-query";
import CardFood from "../../components/CardFood";
import Carrinho from "../../components/Carrinho";

import * as I from "@mui/icons-material";
import * as M from "@mui/material";
import * as S from "./styles";

import Comida from "../../models/Comida";

const fetchMenuItems = async (type: string) => {
  const response = await axios.get(
    `https://apirestaurante.onrender.com/${type}`
  );
  return response.data;
};

const Cardapio = () => {
  const pratos = useQuery<Comida[]>("pratos", () => fetchMenuItems("pratos"));
  const lanches = useQuery<Comida[]>("lanches", () =>
    fetchMenuItems("lanches")
  );
  const beirutes = useQuery<Comida[]>("beirutes", () =>
    fetchMenuItems("beirutes")
  );
  const hamburguers = useQuery<Comida[]>("hamburguers", () =>
    fetchMenuItems("hamburguers")
  );
  const porcoes = useQuery<Comida[]>("porcoes", () =>
    fetchMenuItems("porcoes")
  );
  const bebidas = useQuery<Comida[]>("bebidas", () =>
    fetchMenuItems("bebidas")
  );

  return (
    <>
      <M.Accordion defaultExpanded={true}>
        <M.AccordionSummary expandIcon={<I.ExpandMore />} id="panel1a-header">
          <M.Typography>
            <S.Icon src="https://cdn.discordapp.com/attachments/1101908244559048736/1149044327713095740/bandeja-de-comida.png" />
            Pratos
          </M.Typography>
        </M.AccordionSummary>
        <M.AccordionDetails>
          <M.Typography>
            <S.TabPanelFoods>
              {pratos.data?.map(
                ({ id, item, preco, img, descricao, sem, quantidade }) => {
                  if (sem === "segunda" || sem === null) {
                    return (
                      <CardFood
                        key={id}
                        id={id}
                        item={item}
                        preco={preco}
                        descricao={descricao}
                        img={img}
                        sem={sem ? "Prato do dia" : undefined}
                        quantidade={quantidade}
                      />
                    );
                  }
                }
              )}
            </S.TabPanelFoods>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion>
      {/* <M.Accordion>
        <M.AccordionSummary expandIcon={<I.ExpandMore />} id="panel1a-header">
          <M.Typography>
            <S.Icon src="https://cdn.discordapp.com/attachments/1101908244559048736/1149044328518402238/lanche.png" />
            Lanches
          </M.Typography>
        </M.AccordionSummary>
        <M.AccordionDetails>
          <M.Typography>
            <S.TabPanelFoods>
              {lanches.data?.map(
                ({ id, item, preco, img, descricao, sem, quantidade }) => {
                  if (sem === "segunda" || sem === null) {
                    return (
                      <CardFood
                        key={id}
                        id={id}
                        item={item}
                        preco={preco}
                        descricao={descricao}
                        img={img}
                        sem={sem}
                        quantidade={quantidade}
                      />
                    );
                  }
                }
              )}
            </S.TabPanelFoods>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion>
      <M.Accordion>
        <M.AccordionSummary expandIcon={<I.ExpandMore />} id="panel1a-header">
          <S.TypographyStyle>
            <S.Icon src="https://cdn.discordapp.com/attachments/1101908244559048736/1149044329004945418/sanduiche.png" />
            Beirutes
          </S.TypographyStyle>
        </M.AccordionSummary>
        <M.AccordionDetails>
          <M.Typography>
            <S.TabPanelFoods>
              {beirutes.data?.map(
                ({ id, item, preco, img, descricao, sem, quantidade }) => {
                  if (sem === "segunda" || sem === null) {
                    return (
                      <CardFood
                        key={id}
                        id={id}
                        item={item}
                        preco={preco}
                        descricao={descricao}
                        img={img}
                        sem={sem}
                        quantidade={quantidade}
                      />
                    );
                  }
                }
              )}
            </S.TabPanelFoods>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion>
      <M.Accordion>
        <M.AccordionSummary expandIcon={<I.ExpandMore />} id="panel1a-header">
          <M.Typography>
            <S.Icon src="https://cdn.discordapp.com/attachments/1101908244559048736/1149044327482413137/xicara-de-cafe.png" />
            Café da manhã
          </M.Typography>
        </M.AccordionSummary>

        <M.AccordionDetails>
          <M.Typography>
            <S.TabPanelFoods>
              {lanches.data?.map(
                ({ id, item, preco, img, descricao, sem, quantidade }) => {
                  if (sem === "segunda" || sem === null) {
                    return (
                      <CardFood
                        key={id}
                        id={id}
                        item={item}
                        preco={preco}
                        descricao={descricao}
                        img={img}
                        sem={sem}
                        quantidade={quantidade}
                      />
                    );
                  }
                }
              )}
            </S.TabPanelFoods>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion>
      <M.Accordion>
        <M.AccordionSummary expandIcon={<I.ExpandMore />} id="panel1a-header">
          <M.Typography>
            <S.Icon src="https://cdn.discordapp.com/attachments/1101908244559048736/1149044328279330826/hamburguer.png" />
            Hambúrguer Artesanal
          </M.Typography>
        </M.AccordionSummary>
        <M.AccordionDetails>
          <M.Typography>
            <S.TabPanelFoods>
              {hamburguers.data?.map(
                ({ id, item, preco, img, descricao, sem, quantidade }) => {
                  if (sem === "segunda" || sem === null) {
                    return (
                      <CardFood
                        key={id}
                        id={id}
                        item={item}
                        preco={preco}
                        descricao={descricao}
                        img={img}
                        sem={sem}
                        quantidade={quantidade}
                      />
                    );
                  }
                }
              )}
            </S.TabPanelFoods>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion>
      <M.Accordion>
        <M.AccordionSummary expandIcon={<I.ExpandMore />} id="panel1a-header">
          <M.Typography>
            <S.Icon src="https://cdn.discordapp.com/attachments/1101908244559048736/1149044328023462048/batatas-fritas.png" />
            Porções
          </M.Typography>
        </M.AccordionSummary>
        <M.AccordionDetails>
          <M.Typography>
            <S.TabPanelFoods>
              {porcoes.data?.map(
                ({ id, item, preco, img, descricao, sem, quantidade }) => {
                  if (sem === "segunda" || sem === null) {
                    return (
                      <CardFood
                        key={id}
                        id={id}
                        item={item}
                        preco={preco}
                        descricao={descricao}
                        img={img}
                        sem={sem}
                        quantidade={quantidade}
                      />
                    );
                  }
                }
              )}
            </S.TabPanelFoods>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion>
      <M.Accordion>
        <M.AccordionSummary expandIcon={<I.ExpandMore />} id="panel1a-header">
          <M.Typography>
            <S.Icon src="https://cdn.discordapp.com/attachments/1101908244559048736/1149044328774242314/refrigerante.png" />
            Bebidas
          </M.Typography>
        </M.AccordionSummary>
        <M.AccordionDetails>
          <M.Typography>
            <S.TabPanelFoods>
              {bebidas.data?.map(
                ({ id, item, preco, img, descricao, sem, quantidade }) => {
                  if (sem === "segunda" || sem === null) {
                    return (
                      <CardFood
                        key={id}
                        id={id}
                        item={item}
                        preco={preco}
                        descricao={descricao}
                        img={img}
                        sem={sem}
                        quantidade={quantidade}
                      />
                    );
                  }
                }
              )}
            </S.TabPanelFoods>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion>
      <M.Accordion style={{ marginBottom: "92px" }}>
        <M.AccordionSummary expandIcon={<I.ExpandMore />} id="panel1a-header">
          <M.Typography>
            <S.Icon src="https://cdn.discordapp.com/attachments/1148673197902925917/1151528367678570496/sobremesa.png" />
            Sobremesas
          </M.Typography>
        </M.AccordionSummary>
        <M.AccordionDetails>
          <M.Typography>
            <S.TabPanelFoods>
              {bebidas.data?.map(
                ({ id, item, preco, img, descricao, sem, quantidade }) => {
                  if (sem === "segunda" || sem === null) {
                    return (
                      <CardFood
                        key={id}
                        id={id}
                        item={item}
                        preco={preco}
                        descricao={descricao}
                        img={img}
                        sem={sem}
                        quantidade={quantidade}
                      />
                    );
                  }
                }
              )}
            </S.TabPanelFoods>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion> */}
      <Carrinho />
    </>
  );
};

export default Cardapio;
