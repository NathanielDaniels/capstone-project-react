import React, {useState, useContext} from "react"
import {Context} from "../Context"
import CartItem from "../components/CartItem"

function Cart() {
    const [buttonText, setButtonText] = useState("Place Order")
    const {cartItems, emptyCart} = useContext(Context)
    const totalCost = cartItems.length * 5.99
    const totalCostDisplay = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"})

    const cartItemElements = cartItems.map(item => (
        <CartItem key={item.id} item={item} />
    ))

    function placeOrder() {
      const title = document.querySelector(".cart-page > h1")
      setButtonText("Ordering...")
      setTimeout(() => {
        setButtonText("Place Order")
        title.innerText = "Order Placed!"
        setTimeout(() => {
          title.innerText = "Check Out"
        }, 3000)
        emptyCart()
      }, 1500)
    }
    
    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {totalCostDisplay}</p>
            <div className="order-button">
              <button onClick={placeOrder}>{buttonText}</button>
            </div>
            
        </main>
    )
}

export default Cart