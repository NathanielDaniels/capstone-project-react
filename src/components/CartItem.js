import React, {useState, useContext} from "react"
import {Context} from "../Context"

function CartItem({item}) {
  const {removeFromCart} = useContext(Context)
  const [hovered, setHovered] = useState(false)

  function trashHover() {
    if (hovered) {
      return "ri-delete-bin-fill" 
    } else {
      return "ri-delete-bin-line" 
    }
  }

  return (
    <>
      <div className="cart-item">
        <i className={trashHover()}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)} 
          onClick={() => removeFromCart(item.id)}>
        </i>
        <img src={item.url} width="130px" alt={item.id}/>
        <p>$5.99</p>
      </div>
      <hr/>
    </>
  )
}

export default CartItem