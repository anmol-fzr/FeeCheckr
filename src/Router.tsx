import { Routes, Route } from "react-router-dom"
import { NotFound, Users } from "@/pages"
import { Layout } from "@/layout"

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path="users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export { Router }

