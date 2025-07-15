import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { SettingsIcon, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge, Tipper } from "@/components";
import { Icon } from "@iconify/react";
import { logout } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
	const role = useAuthStore((state) => state.creds.role)?.toUpperCase();
	const name = useAuthStore((state) => state.creds.name)
		?.toUpperCase()
		.slice(0, 2);
	const navigate = useNavigate();

	const toSettings = () => navigate("/settings/ui");

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 h-4" />
			<div className="flex mr-0 ml-auto gap-2 items-center">
				<Tipper tooltip={`You are a ${role}`}>
					<Badge className="gap-2 capitalize px-4">
						<Icon icon="solar:shield-user-line-duotone" fontSize={24} />
						{role}
					</Badge>
				</Tipper>
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="cursor-pointer">
							<AvatarFallback>{name}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="flex flex-col gap-1 w-56">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={toSettings}>
								<SettingsIcon /> Settings
							</DropdownMenuItem>
							<DropdownMenuItem onClick={logout}>
								<LogOut /> Logout
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export { Navbar };
