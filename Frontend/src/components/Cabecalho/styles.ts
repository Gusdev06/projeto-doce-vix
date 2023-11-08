import styled from "styled-components";
import variables from "../../styles/variables";

export const info = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// export const Header = styled.header`
//   background: url("https://servidor-estaticos-topaz-eight.vercel.app/Background.png");
//   height: 140px;
//   position: relative;
// `;

export const DivLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.div`
  background: url("https://servidor-estaticos-topaz-eight.vercel.app/Logo.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 200px;
  height: 200px;
  position: absolute;

  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 414px) {
    margin-bottom: 32px;
  }
`;

export const DivTitulo = styled.div`
  text-align: center;
  padding-top: 88px;
  padding-bottom: 32px;
  background-color: #fff;
  h1 {
    font-family: "Anton", sans-serif;
    color: ${variables.corPrincipal};

    @media (max-width: 767px) {
      font-size: 28px;
    }
  }

  span {
    color: ${variables.corSecundaria};
  }

  p {
    font-size: 17px;

    @media (max-width: 414px) {
      font-size: 16px;
    }
  }
`;

export const StatusRestaurante = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 16px;
  margin-bottom: 16px;

  width: 101px;
  height: 28px;

  background-color: ${variables.verdeClaro};
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  border-radius: 30px;

  @media (max-width: 414px) {
    width: 85px;
    font-size: 14px;
    margin-top: 16px;
  }
`;

export const StatusRestauranteFechado = styled(StatusRestaurante)`
  background-color: ${variables.vermelho};
`;

export const Content = styled.div`
  position: relative;
`;

export const InfosList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    a {
      color: #000;
      text-decoration: none;
    }
  }
`;
