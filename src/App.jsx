import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Cart from "./components/Cart/Cart"

import './styles/App.css'
import { useState } from "react"

function App() {
  const [cart, setCart] = useState([]);
  const [cartVisibility, setCartVisibilty] = useState(false);

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
      <Outlet context={[cart, setCart]} />
      <Cart
      cart={cart}
      setCart={setCart}
      handleCartVisibilityChange={handleCartVisibilityChange}
      cartVisibility={cartVisibility} />
    </>
  )
}

export default App
