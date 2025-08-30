import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import MainSection from "./Components/MainSection/MainSection";
import { CartProvider } from "./Components/ContextAPI/Context";
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import Store from "./Components/Store/Store";
import AboutUs from "./Components/AboutUs/AboutUs";



const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  )
}
const appRoute = createBrowserRouter([
{path: '/',
  element: <Layout/>,
  children:[
    {
      path: '/',
      element: <MainSection/>
    },
    {
      path: '/store',
      element: <Store />
    },
    {
      path: '/about',
      element: <AboutUs />
    }
  ]
}
])


const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={appRoute} />
    </CartProvider>
  );
};

export default App;
