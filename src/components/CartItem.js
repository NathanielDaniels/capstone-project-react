import React, {useContext} from "react"
import PropTypes from "prop-types"
import {Context} from "../Context"
import useHover from "../hooks/useHover"

function CartItem({item}) {
  const [hovered, ref] = useHover()
  const {removeFromCart} = useContext(Context)
  // const [hovered, setHovered] = useState(false)

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
          onClick={() => removeFromCart(item.id)}
          ref={ref}>
        </i>
        <img src={item.url} width="130px" alt={item.id}/>
        <p>$5.99</p>
      </div>
      <hr/>
    </>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired
  })
}

export default CartItem