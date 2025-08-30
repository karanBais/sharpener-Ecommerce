import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import MainSection from "./Components/StorePage/StorePage";
import { CartProvider } from "./Components/ContextAPI/Context";
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import AboutUs from "./Components/AboutUs/AboutUs";
import Footer from "./Components/Navbar/Footer";
import StorePage from "./Components/StorePage/StorePage";
import HomePage from "./Components/HomePage/HomePage";



const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-grow">
      <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}
const appRoute = createBrowserRouter([
{path: '/',
  element: <Layout/>,
  children:[
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/store',
      element: <StorePage />
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
