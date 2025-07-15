import { Role } from "@/store/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UseRole = Role | Role[];

const useRole = (allowedRoles: UseRole) => {
	const currRole = useAuthStore((state) => state.creds.role);
	const navigate = useNavigate();

	useEffect(() => {
		if (Array.isArray(allowedRoles)) {
			if (!allowedRoles.includes(currRole)) {
				return navigate("/");
			}
		} else if (currRole !== allowedRoles) {
			return navigate("/");
		}
	}, [currRole, allowedRoles]);
};

export { useRole };
