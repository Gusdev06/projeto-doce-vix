import React from 'react';
import EstiloGlobal, { Container, CabecalhoImg } from "./styles";
import Cabecalho from "./components/Cabecalho";
// import Cardapio from "./containers/Cardapio";
import store from "./store";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <EstiloGlobal />
          <CabecalhoImg />
          <Container>
            <Cabecalho />
          </Container>
          <ToastContainer autoClose={3000} />
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App;
