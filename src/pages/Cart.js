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
      const orderButton = document.querySelector(".order-button > button")
      orderButton.style.backgroundColor = "lightgray"
      setButtonText("Ordering...")
      setTimeout(() => {
        orderButton.style.backgroundColor = "#fff"
        setButtonText("Place Order")
        changeCartTitle()
        emptyCart()
      }, 1500)
    }

    function changeCartTitle() {
      const title = document.querySelector(".cart-page > h1")
      title.style.color = "green"
      title.innerText = "Order Placed!"
      setTimeout(() => {
        title.style.color = "black"
        title.innerText = "Check Out"
      }, 3000)
    }

    const showOrderBtn = () => (cartItems.length > 0 && <button onClick={placeOrder}>{buttonText}</button>)
    
    
    return (
      <main className="cart-page">
        <h1>Check out</h1>
        {cartItemElements}
        <p className="total-cost">Total: {totalCostDisplay}</p>
        <div className="order-button">
          {showOrderBtn()}
        </div>
      </main>
    )
}

export default Cart