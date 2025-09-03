import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Cart/CartContext';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';

const AppNavbar = lazy(() => import('./components/AppNavbar'));
const CartDrawer = lazy(() => import('./components/Cart/CartDrawer'));
const ProductsList = lazy(() => import('./components/Product/ProductsList'));
const Home = lazy(() => import('./components/Home/Home'));
const About = lazy(() => import('./components/About/About'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const ProductDetailPage = lazy(() => import('./components/Product/ProductDetailPage'));
const LoginForm = lazy(() => import('./components/Login/LoginForm'));
const Signup = lazy(() => import('./components/Signup/Signup'));

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<p className="text-center mt-5">Loading...</p>}>
          <AppNavbar onCartClick={() => setShowCart(true)} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/store"
              element={
                <PrivateRoute>
                  <ProductsList />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

          <CartDrawer show={showCart} handleClose={() => setShowCart(false)} />
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
