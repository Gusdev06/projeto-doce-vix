import { BiInfoCircle, BiLogoWhatsapp, BiPhone, BiTime } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

import * as I from "@mui/icons-material";
import * as M from "@mui/material";
import * as S from "./styles";
import Login from "../Login";

const Cabecalho = () => {
  return (
    <S.Content>
      <S.DivLogo>
        <S.Logo />
      </S.DivLogo>
      <Login />
      <S.DivTitulo>
        <h1>
          Doce<span>Vix</span> Restaurante e Lanchonete
        </h1>
        <p>Restaurante e lanchonete de comida brasileira. Bom almoço!!!</p>
      </S.DivTitulo>
      <S.StatusRestaurante>Aberto</S.StatusRestaurante>
      <M.Accordion defaultExpanded={true}>
        <M.AccordionSummary expandIcon={<I.ExpandMore />}>
          <M.Typography>
            <S.info>
              <BiInfoCircle />
              <strong>Informações do restaurante</strong>
            </S.info>
          </M.Typography>
        </M.AccordionSummary>
        <M.AccordionDetails>
          <M.Typography>
            <S.InfosList>
              <li>
                <S.info>
                  <MdLocationOn />
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/dir//-20.515003,-54.639775/@-20.5148702,-54.7221258,12z?entry=ttu"
                    rel="noreferrer"
                  >
                    <strong>Endereço</strong>: R. José de Magalhães, 256 - Vila
                    Clementino, São Paulo - SP, 04026-090
                  </a>
                </S.info>
              </li>
              <li>
                <S.info>
                  <BiTime />
                  <strong>Horário:</strong> Segunda a Sexta das 07:00 às 15:00 |
                  Fechado aos finais de semana
                </S.info>
              </li>
              <li>
                <S.info>
                  <BiPhone />
                  <a target="_blank" href="tel:50825179">
                    {" "}
                    <strong>Telefone:</strong> (11) 5082-5179
                  </a>
                </S.info>
              </li>
              <li>
                <S.info>
                  <BiLogoWhatsapp />
                  <a
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=11976728089"
                    rel="noreferrer"
                  >
                    {" "}
                    <strong>WhatsApp:</strong> (11) 976728089
                  </a>
                </S.info>
              </li>
            </S.InfosList>
          </M.Typography>
        </M.AccordionDetails>
      </M.Accordion>
    </S.Content>
  );
};

export default Cabecalho;
