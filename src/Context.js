import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
  const [allPhotos, setAllPhotos] = useState(JSON.parse(localStorage.getItem("photos")) || [])
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || [])

  
  
  // const [allPhotos, setAllPhotos] = useState([])
  // const [cartItems, setCartItems] = useState([])

  console.log("storage:", JSON.parse(localStorage.getItem("photos")))
  useEffect(() => {
    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    const photoStorage = JSON.parse(localStorage.getItem("photos"))
    console.log("photoStorage", photoStorage)
    fetch(url)
      .then(res => res.json())
      // .then(data => setAllPhotos(data))
      .then(data => photoStorage.length > 0 ? photoStorage : setAllPhotos(data))
      .catch(error => {
        console.error('Fetch Error!', error)
      })
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
    localStorage.setItem("photos", JSON.stringify(allPhotos))
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
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