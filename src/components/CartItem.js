import React, {useContext} from "react"
import {Context} from "../Context"

function CartItem({item}) {
  const {removeFromCart} = useContext(Context)
  // const trashCan = 

  return (
    <>
      <div className="cart-item">
        <i className="ri-delete-bin-line" onClick={() => removeFromCart(item.id)}></i>
        <img src={item.url} width="130px" alt={item.id}/>
        <p>$5.99</p>
      </div>
      <hr/>
    </>
  )
}

export default CartItem