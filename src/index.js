import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from "react-router-dom"
// import {HashRouter as Router} from "react-router-dom"

import {ContextProvider} from "./Context"
import App from "./App"
import "./index.css"

ReactDOM.render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>, 
  document.getElementById("root")
)
