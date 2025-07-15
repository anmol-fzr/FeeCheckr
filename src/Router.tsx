import { Routes, Route } from "react-router-dom";
import {
	Users,
	Login,
	Clerk,
	SuperAdmin,
	FeesPage,
	Hod,
	UiSettings,
	AccountSettings,
	Student,
	StudentOnlyPage,
	FeeOnlyPage,
} from "@/pages";
import { AuthLayout, SettingsLayout, Layout } from "@/layout";

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
				<Route path="fees" element={<FeesPage />} />
				<Route path="fees/:feeId" element={<FeeOnlyPage />} />
				<Route path="settings" element={<SettingsLayout />}>
					<Route path="ui" element={<UiSettings />} />
					<Route path="account" element={<AccountSettings />} />
					<Route path="app" element={<UiSettings />} />
				</Route>
			</Route>
		</Routes>
	);
};

export { Router };
