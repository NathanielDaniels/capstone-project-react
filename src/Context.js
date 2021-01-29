import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
  const [allPhotos, setAllPhotos] = useState([])
  // const [allPhotos, setAllPhotos] = useState({isFavorite: localStorage.getItem("favorited")})
  const [cartItems, setCartItems] = useState([])

  console.log("did it save?",localStorage.getItem("favorited"))

  console.log("Tester",allPhotos.map(item => ({"url": item.url, "id": item.id, "isFavorite": localStorage.getItem("favorited")})))


  // console.log(allPhotos.map(photo => localStorage.setItem("favorited", photo.isFavorite)))
  // console.log(allPhotos.map(photo => photo.isFavorite && localStorage.setItem("favorited", photo.isFavorite)))
  // localStorage.setItem("favorited", allPhotos.map(item => item))

  // console.log("allPhotos",allPhotos)
  // const storageFavorites = localStorage.getItem("favorited")
  // setAllPhotos(storageFavorites)
  
  
  const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllPhotos(data))
  }, [])
  
  function toggleFavorite(id) {
  //  const favoritedImgList = localStorage.getItem("favorited")
    const updatedArr = allPhotos.map(photo => {
      if (photo.id === id) {
        // localStorage.setItem("favorited", allPhotos.map(item => item.isFavorite))
        // console.log("Local Storage Img:", localStorage.getItem("favorited"))
        return {...photo, isFavorite: !photo.isFavorite}
      }
      return photo
    })
    setAllPhotos(updatedArr)
  }

  useEffect(() => {
    // localStorage.setItem("favorited", allPhotos.map(item => {"url": item.url, "id": item.id, "isFavorite": item.isFavorite}))
    // console.log("useEffect local Storage:", localStorage.getItem("favorited"))
    // setAllPhotos({isFavorite: localStorage.getItem("favorited")})
  })


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