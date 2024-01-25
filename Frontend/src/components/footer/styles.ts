import Styled from "styled-components";
import variables from "../../styles/variables";

export const CardFooter = Styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  width: 100%;
  height: 50px;
  color: #fff;
  font-weight: bold;
  background-color: ${variables.corPrincipal};
`;

export const Nav = Styled.ul`
display: flex;
align-items: center;
justify-content: space-between;
text-decoration: none;

`;

export const NavItem = Styled.a`

color: #fff;
list-style: none;
text-decoration: none;

`;

export const Container = Styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 767px) {

 
  }
`;
