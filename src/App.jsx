import { useReducer, useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"
import cartReducer from "./cartReducer"

import './styles/App.css'

const initialState = { cart: [] };

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState)
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
      cartCount={state.cart.length}
      handleCartVisibilityChange={handleCartVisibilityChange} 
      />

      <Outlet 
      context={{state, dispatch}} 
      />

      <Cart
      state={state}
      dispatch={dispatch}
      handleCartVisibilityChange={handleCartVisibilityChange}
      cartVisibility={cartVisibility} 
      />

      <Footer />
    </>
  )
}

export default App
