import React, {useContext} from "react"
import {Context} from "../Context"
import CartItem from "../components/CartItem"

function Cart() {
    const {cartItems} = useContext(Context)
    const cartItemElements = cartItems.map(item => (
        <CartItem key={item.id} item={item} />
    ))

    function purchaseTimer() {
      const btn = document.querySelector('.order-button > button')
      console.log(btn)
      setTimeout(() => {
        btn.style.backgroundColor = "lightgreen"
        btn.innerText = "Order Complete"
      }, 1500)
    }
    
    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: ${cartItems.length * 5.99}</p>
            <div className="order-button">
                <button onClick={() => purchaseTimer()}>Place Order</button>
            </div>
        </main>
    )
}

export default Cart