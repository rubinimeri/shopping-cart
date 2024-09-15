import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"

import './styles/App.css'
import { useState } from "react"

function App() {
  const [cart, setCart] = useState([]);
  const [cartVisibility, setCartVisibilty] = useState(false);

  function addToCart(id, products, quantity) {
    const checkProduct = cart.find(product => product.id == id);

    if(checkProduct) {
      const productIndex = cart.findIndex(product => product.id == id)
      const cartClone = [...cart];
      cartClone[productIndex].quantity += quantity;
      setCart([...cartClone]);
    } 
    else {
      const currentProduct = 
        Array.isArray(products) ? 
        products.find(product => product.id == id) :
        products
      setCart([...cart, {...currentProduct, quantity: quantity}])
    } 
  }

  function handleCartVisibilityChange(e) {
    e.preventDefault();
    setCartVisibilty(!cartVisibility)
  }

  return (
    <>
      <div
      style={{display: cartVisibility ? 'block' : 'none'}}
      className="overlay"></div>
      <Navbar
      cartCount={cart.length}
      handleCartVisibilityChange={handleCartVisibilityChange} />
      <Outlet context={addToCart} />
      <Cart
      cart={cart}
      setCart={setCart}
      handleCartVisibilityChange={handleCartVisibilityChange}
      cartVisibility={cartVisibility} />
      <Footer />
    </>
  )
}

export default App
