import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import MainSection from "./Components/MainSection/MainSection";
// import { createBrowserRouter } from "react-router-dom";

const App = () => {
  // const appRoute = createBrowserRouter([
  //   {
  //     Path: "/",
  //     element: <Navbar />,
  //   },
  // ]);
  return (
    <>
      <Navbar />
      <MainSection />
    </>
  );
};

export default App;
