import React, {useContext} from "react"
import {Context} from "../Context"
import {Link} from "react-router-dom"

function Header() {
  const {cartItems} = useContext(Context)
  const cartClassName = cartItems.length > 0 ? "ri-shopping-cart-fill" : "ri-shopping-cart-line"

  console.log("header cart items" , cartItems.length)

  const cartCounter = () => (
    cartItems.length > 0 && <span className="cartCounter">{cartItems.length}</span>
  )

  return (
    <header>
      <Link to="/">
        <h2>Pic Some</h2>
      </Link>
      <Link to="/cart">
        <div className="cartInfo">
          {cartCounter()}
          <i className={`${cartClassName} ri-fw ri-2x`}></i>
        </div>
      </Link>
    </header>
  )
}

export default Header
