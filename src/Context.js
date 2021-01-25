import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
  const [allPhotos, setAllPhotos] = useState([])
  const [cartItems, setCartItems] = useState([])
  
  const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllPhotos(data))
  }, [])
  
  function toggleFavorite(id) {
    const updatedArr = allPhotos.map(photo => {
      if (photo.id === id) {
        // console.log("id:",id)
        // console.log("Favorited:", !photo.isFavorite)
        // localStorage.setItem("favorited", photo.isFavorite)
        return {...photo, isFavorite: !photo.isFavorite}
      }
      return photo
    })
    setAllPhotos(updatedArr)
  }
  function addToCart(url) {
    // const photoUrl = allPhotos.map(photo => setCartItems(photo.url))
    console.log(url)
    // return photoUrl
  }
  
  console.log("Cart items:",cartItems)
  
  return (
    <Context.Provider value={{allPhotos, toggleFavorite}}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}