import { createContext } from "react";

const appState = {
  name: "react-app"
}

const AppContext = createContext(appState)

export { AppContext }
