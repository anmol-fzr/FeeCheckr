import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import {
  Building,
  HouseIcon,
  ShieldCheck,
  UserCheck,
  BriefcaseBusinessIcon,
  GraduationCap,
} from "lucide-react";
import { isSchema } from "yup";
import { useAuthStore } from "@/store";

// This is sample data.
const links = [
  {
    title: "Dashboard",
    icon: <HouseIcon />,
    allowedRoles: ["superadmin", "hod", "clerk"],
    to: "/",
  },
  {
    title: "Departments",
    icon: <Building />,
    allowedRoles: ["superadmin"],
    to: "/dept",
  },
  {
    title: "Super Admin",
    icon: <ShieldCheck />,
    allowedRoles: ["superadmin"],
    to: "/superadmin",
  },
  {
    title: "HOD",
    icon: <UserCheck />,
    allowedRoles: ["superadmin"],
    to: "/hod",
  },
  {
    title: "Clerk",
    icon: <BriefcaseBusinessIcon />,
    allowedRoles: ["superadmin", "hod"],
    to: "/clerk",
  },
  {
    title: "Student",
    icon: <GraduationCap />,
    allowedRoles: ["superadmin", "hod", "clerk"],
    to: "/student",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currRole = useAuthStore((state) => state.creds.role);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/*
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      */}
        SBSSU
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map(({ to, title, icon, allowedRoles }) => {
                const canSee = allowedRoles.includes(currRole);
                return (
                  canSee && (
                    <SidebarMenuItem key={title}>
                      <NavLink
                        to={to}
                        className={({ isActive }) =>
                          `flex px-1 rounded-md ${isActive ? "bg-primary " : "hover:bg-white/10"}`
                        }
                      >
                        <SidebarMenuButton className="gap-3 text-md">
                          {icon}
                          {title}
                        </SidebarMenuButton>
                      </NavLink>
                    </SidebarMenuItem>
                  )
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export { links as sideBarLinks };
