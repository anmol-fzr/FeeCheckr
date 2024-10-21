import { Routes, Route } from "react-router-dom";
import {
  NotFound,
  Users,
  Login,
  Clerk,
  SuperAdmin,
  Hod,
  EditHod,
  Dept,
  AddDeptPage,
  Settings,
} from "@/pages";
import { AuthLayout, Layout } from "@/layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="*" element={<Users />} />
        <Route path="clerk" element={<Clerk />} />
        <Route path="superadmin" element={<SuperAdmin />} />
        <Route path="hod" element={<Hod />} />
        <Route path="hod/edit" element={<EditHod />} />
        <Route path="dept" element={<Dept />} />
        <Route path="dept/add" element={<AddDeptPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export { Router };
