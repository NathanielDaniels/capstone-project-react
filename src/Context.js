import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
  const [allPhotos, setAllPhotos] = useState([])
  const [cartItems, setCartItems] = useState([])

  // console.log("Tester",allPhotos.map(item => ({"url": item.url, "id": item.id, "isFavorite": localStorage.getItem("favorited")})))
  
  const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllPhotos(data))
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

  // console.log("did it save?",localStorage.getItem("favorited"))

  // useEffect(() => {
    // console.log(allPhotos)
    // const favorites = allPhotos.map(item => item)
    // console.log("favorites:",favorites)
    // for (let i = 0; i < favorites.length; i++) {
    //   console.log(favorites[i])
    //   localStorage.setItem("favorited", favorites[i])
    //   // const updateFav = JSON.parse(localStorage.getItem("favorited"))
    //   const updateFav = localStorage.getItem("favorited")
    //   console.log(updateFav)
    //   // setAllPhotos{updateFav}
    // }



    // localStorage.setItem("favorited", allPhotos.map(item => item.isFavorite))
    // console.log("did it save?",localStorage.getItem("favorited"))
    // // localStorage.setItem("favorited", allPhotos.map(item => {"url": item.url, "id": item.id, "isFavorite": item.isFavorite}))
    //   const mapFavorites = [...localStorage.getItem("favorited").split(",")]

    //   for (let i = 0; i < mapFavorites.length; i++) {
    //     // console.log(mapFavorites[i])
    //     // const mappedItems = allPhotos.map(item => ({"url": item.url, "id": item.id, "isFavorite": mapFavorites[i]}))
    //     const mappedItems = allPhotos.map(item => item)
    //     console.log("Mapped Items: ", mappedItems)
    //   }
      // console.log("mapFavorites", mapFavorites)
  // }, [allPhotos])


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