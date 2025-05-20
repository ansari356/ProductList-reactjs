import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import ProductsList from './pages/ProductList';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import NotFound from './pages/NotFound';
import './App.css';
// import Register from './pages/Register';
// import Login from './pages/Login';
import { Provider } from 'react-redux';
import store from './store/store';
import LanguageProvider from './context/LanguageContext';


const ProductsList = lazy(() => import('./pages/ProductList'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));


// Main App Component
export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
      
      <LanguageProvider>

    <BrowserRouter>
        <Provider store={store}>

      <div className="min-h-screen bg-gray-100">
        <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
         
        <Routes>
          <Route path="/" element={<ProductsList addToCart={addToCart} />} />
          <Route path="/products" element={<ProductsList addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/login" element={<div className="container mx-auto mt-5"> <Login/></div>}/>  
          <Route path="/register" element={<div className="container "><Register/></div>}/>        
          
          <Route 
            path="/cart" 
            element={
              <Cart 
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </div>
      </Provider>
    </BrowserRouter>
    </LanguageProvider>
  );
}