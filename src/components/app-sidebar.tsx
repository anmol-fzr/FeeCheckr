import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import pkg from "@/../package.json";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Building,
  HouseIcon,
  ShieldCheck,
  UserCheck,
  BriefcaseBusinessIcon,
  GraduationCap,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store";

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    allowedRoles: ["superadmin", "hod", "clerk"],
  },
  {
    title: "Departments",
    url: "/dept",
    allowedRoles: ["superadmin"],
    //items: [
    //  {
    //    title: "Add Department",
    //    url: "/dept/add",
    //    allowedRoles: ["superadmin"],
    //  },
    //],
  },
  {
    title: "Super Admin",
    url: "/superadmin",
    allowedRoles: ["superadmin"],
  },
  {
    title: "HOD",
    url: "/hod",
    allowedRoles: ["superadmin"],
  },
  {
    title: "Clerk",
    url: "/clerk",
    allowedRoles: ["superadmin", "hod"],
  },
  {
    title: "Student",
    url: "/student",
    allowedRoles: ["superadmin", "hod", "clerk"],
  },
];

const link = [
  {
    url: "/hod/edit",
    allowedRoles: ["superadmin", "hod", "clerk"],
  },
];

navMain.forEach((nav) => {
  const { url, allowedRoles } = nav;
  link.push({ url, allowedRoles });
  if (nav?.items && nav.items.length > 0) {
    nav.items.forEach((nav) => {
      const { url, allowedRoles } = nav;
      link.push({ url, allowedRoles });
    });
  }
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currRole = useAuthStore((state) => state.creds.role);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SBSSU {pkg.name}</span>
                  <span className="">v{pkg.version}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map(({ title, items, url, allowedRoles }) => {
              const canSee = allowedRoles.includes(currRole);
              return (
                canSee && (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={url}
                        className={({ isActive }) =>
                          `font-medium ${isActive && "bg-primary"}`
                        }
                        end
                      >
                        {title}
                      </NavLink>
                    </SidebarMenuButton>
                    {items?.length ? (
                      <SidebarMenuSub>
                        {items.map(({ title, url, allowedRoles }) => {
                          const canSee = allowedRoles.includes(currRole);
                          return (
                            canSee && (
                              <SidebarMenuSubButton asChild key={title}>
                                <NavLink end to={url}>
                                  {title}
                                </NavLink>
                              </SidebarMenuSubButton>
                            )
                          );
                        })}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                )
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export { link as sideBarLinks };
