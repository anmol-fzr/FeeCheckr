import { BrowserRouter } from "react-router-dom"
import type { OnlyChild } from "../../types"

const Provider = ({ children }: OnlyChild) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

export { Provider }
