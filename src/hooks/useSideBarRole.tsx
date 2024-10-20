import { sideBarLinks } from "@/components";
import { useRole } from "./useRole";
import { useLocation } from "react-router-dom";

const useSideBarRole = () => {
  const { pathname } = useLocation();

  const roles = sideBarLinks.find((link) => link.to === pathname)?.allowedRoles;

  useRole(roles);
};

export { useSideBarRole };
