import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Cabecalho from "./components/Cabecalho";
import Cardapio from "./containers/Cardapio";
import { AuthProvider } from "./contexts/AuthContext";
import { DishProvider } from "./contexts/dishContext";
import { queryClient } from "./services/queryClient";
import store from "./store";
import EstiloGlobal, { CabecalhoImg, Container } from "./styles";

function App() {
  return (
    <DishProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <EstiloGlobal />
            <CabecalhoImg />
            <Container>
              <Cabecalho />
              <Cardapio />
            </Container>
            <ToastContainer autoClose={3000} />
          </Provider>
        </QueryClientProvider>
      </AuthProvider>
    </DishProvider>
  );
}

export default App;
