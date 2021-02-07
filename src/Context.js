import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
  const [allPhotos, setAllPhotos] = useState([])
  const [cartItems, setCartItems] = useState([])

  console.log("allPhoto test: ",allPhotos.map(item => item))

  // console.log("Tester",allPhotos.map(item => ({"url": item.url, "id": item.id, "isFavorite": localStorage.getItem("favorited")})))
  // console.log("localStorage Test: ", localStorage.getItem("photos"))
  
  const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllPhotos(data))
  }, [])
  
  function toggleFavorite(id) {
    const updatedArr = allPhotos.map(photo => {
      if (photo.id === id) {
        localStorage.setItem("photos", photo.isFavorite)
        return {...photo, isFavorite: !photo.isFavorite}
      }
      return photo
    })
    setAllPhotos(updatedArr)
  }

  // console.log("did it save?",localStorage.getItem("favorited"))

  useEffect(() => {

    // const favorites = allPhotos.map(item => item.isFavorite)
    // console.log(favorites)

    const mappedItems = allPhotos.map(item => item)
    console.log("Mapped Items: ", mappedItems)
    
    localStorage.setItem("test",  allPhotos.map(item => item))
    console.log(localStorage.getItem("test"))
  }, [allPhotos])

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