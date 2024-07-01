import { Routes, Route } from "react-router-dom"
import { NotFound, UnAuthorized } from "@/pages"
import { Layout, AuthLayout } from "@/layout"

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export { Router }

