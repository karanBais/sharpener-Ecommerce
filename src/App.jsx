import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import MainSection from "./Components/MainSection/MainSection";
import { CartProvider } from "./Components/ContextAPI/Context";

const App = () => {
  return (
    <CartProvider>
      <Navbar />
      <MainSection />
    </CartProvider>
  );
};

export default App;
