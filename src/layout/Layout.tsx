import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components";

const Layout = () => {
  const isLogin = useAuthStore((state) => state.creds.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      return navigate("/auth/login");
    }
  }, [isLogin]);

  return (
    <SidebarProvider>
      <AppSidebar variant="floating" defaultChecked={false} />
      <SidebarInset>
        <Navbar />
        <div className="flex flex-1 flex-col gap-4 p-3">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Layout };
