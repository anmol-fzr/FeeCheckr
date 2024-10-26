import { Routes, Route } from "react-router-dom";
import {
  NotFound,
  Users,
  Login,
  Clerk,
  SuperAdmin,
  FeesPage,
  Hod,
  EditHod,
  Dept,
  AddDeptPage,
  Settings,
  Student,
  StudentOnlyPage,
  FeeOnlyPage,
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
        <Route path="student" element={<Student />} />
        <Route path="student/:studentId" element={<StudentOnlyPage />} />
        <Route path="hod" element={<Hod />} />
        <Route path="hod/edit" element={<EditHod />} />
        <Route path="dept" element={<Dept />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="fees/:feeId" element={<FeeOnlyPage />} />
        <Route path="dept/add" element={<AddDeptPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export { Router };
