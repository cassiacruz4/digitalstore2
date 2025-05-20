import { useState } from "react";
import "./App.css";
import Compra from "./components/Compra";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Compra />
      <Footer />
    </>
  );
}

export default App;
