import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
	const isLogin = useAuthStore((state) => state.creds.isLogin);
	const navigate = useNavigate();

	useEffect(() => {
		if (isLogin) {
			return navigate("/");
		}
	}, [isLogin]);

	return (
		<div className="flex place-items-center h-[100dvh] px-3">
			<Outlet />
		</div>
	);
};

export { AuthLayout };
