import Login from "../Login";
import { CardFooter, Container, Nav, NavItem } from "./styles";

const Footer = () => {
  return (
    <CardFooter>
      <Container>
        <Nav>
          <li>
            <NavItem href="#">Inicio</NavItem>
          </li>
          <li>
            <NavItem href="#">Meus Pedidos</NavItem>
          </li>
          <li>
            <NavItem href="#">
              <Login />
            </NavItem>
          </li>
        </Nav>
      </Container>
    </CardFooter>
  );
};

export default Footer;
