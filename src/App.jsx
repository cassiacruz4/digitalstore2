import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserProvider } from "./contexts/UserContexts";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <UserProvider>
      <BrowserRouter>
      <Header/>
      <AppRoutes/>
      <Footer/>
      
      </BrowserRouter>

    </UserProvider>
    </>
  );
}

export default App;
