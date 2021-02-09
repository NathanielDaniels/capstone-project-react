import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
  const [allPhotos, setAllPhotos] = useState(JSON.parse(localStorage.getItem("photos")).length > 0 ? JSON.parse(localStorage.getItem("photos")) : [])
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : [])

  // console.log(JSON.parse(localStorage.getItem("photos")).length)
  
  const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
  useEffect(() => {
    const photoStorage = JSON.parse(localStorage.getItem("photos"))
    fetch(url)
      .then(res => res.json())
      .then(data => photoStorage.length > 0 ? photoStorage : setAllPhotos(data))
  }, [])
  
  function toggleFavorite(id) {
    const updatedArr = allPhotos.map(photo => {
      if (photo.id === id) {
        return {...photo, isFavorite: !photo.isFavorite}
      }
      return photo
    })
    setAllPhotos(updatedArr)
  }

  useEffect(() => {

    // console.log("AllPhotos useEffect:", allPhotos)

    localStorage.setItem("photos", JSON.stringify(allPhotos))
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    
    // console.log(JSON.parse(localStorage.getItem("cartItems")).length)
    // console.log("localStorage:", JSON.parse(localStorage.getItem("photos")))

  }, [allPhotos, cartItems])

  function addToCart(newItem) {
    setCartItems(prevItems => [...prevItems, newItem])
  }
  function removeFromCart(id) {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  function emptyCart() {
    setCartItems([])
  }
  
  return (
    <Context.Provider value={{
      allPhotos, 
      toggleFavorite, 
      cartItems,
      addToCart, 
      removeFromCart,
      emptyCart
    }}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}