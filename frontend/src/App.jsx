import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserProvider } from "./contexts/UserContexts";
import { CartProvider } from "./contexts/CartContext";
import { SapatoProvider } from "./contexts/ContextoSapato";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  console.log("App foi carregado ");
  const [count, setCount] = useState(0);

  return (
    <UserProvider>
      <CartProvider>
        <SapatoProvider>
          <BrowserRouter>
            <Header />
            <AppRoutes />
            <Footer />
          </BrowserRouter>
        </SapatoProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
