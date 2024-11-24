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
	SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store";
import { Separator } from "./ui/separator";

const navMain = [
	{
		title: "Dashboard",
		url: "/",
		allowedRoles: ["superadmin", "hod", "clerk"],
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
	{
		title: "View Student",
		url: "/student/:studentId",
		allowedRoles: ["superadmin", "hod", "clerk"],
		hidden: true,
	},
	{
		title: "Fees",
		url: "/fees",
		allowedRoles: ["superadmin", "hod", "clerk"],
	},
];

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
			<div className="px-4">
				<Separator />
			</div>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{navMain.map(({ title, url, allowedRoles, hidden }) => {
							const canSee = !hidden && allowedRoles.includes(currRole);
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

export { AppSidebar };
export { navMain as sideBarLinks };
