import { Typography } from "@mui/material";
import styled from "styled-components";

export const TabPanelFoods = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 0;
  margin-bottom: 70px;
  margin-top: -40px;
  

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const TypographyStyle = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  width: 24px;
  margin-right: 12px;
`;
