import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, sideBarLinks } from "@/components";
import { AppSidebar } from "@/components/app-sidebar";
import { SettingsIcon, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components";
import { Icon } from "@iconify/react";
import { logout } from "@/config";

const Layout = () => {
  const isLogin = useAuthStore((state) => state.creds.isLogin);
  const role = useAuthStore((state) => state.creds.role);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      return navigate("/auth/login");
    }
  }, [isLogin]);

  const title = sideBarLinks.find(({ to }) => to === pathname)?.title ?? "";

  const toSettings = () => navigate("/settings");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex mr-0 ml-auto gap-2 items-center">
            <Badge className="gap-2 capitalize">
              <Icon icon="solar:shield-user-line-duotone" fontSize={24} />
              {role}
            </Badge>
            <Button variant="outline" size="icon" onClick={toSettings}>
              <SettingsIcon />
            </Button>
            <Button variant="outline" size="icon" onClick={logout}>
              <LogOut />
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-3">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Layout };
