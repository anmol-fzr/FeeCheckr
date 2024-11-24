import { Outlet } from "react-router-dom";
import { PageHeader, Separator, SettingsSidebar } from "@/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SettingsLayout = () => {
	const [parent] = useAutoAnimate();
	return (
		<div className="flex w-full items-center justify-center p-4 md:p-6 max-w-theme">
			<div className="space-y-6 w-full ">
				<PageHeader title="Settings" desc="Manage your account settings." />
				<Separator className="my-6" />
				<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside className="lg:w-1/5">
						<SettingsSidebar />
					</aside>

					<div className="flex-1 lg:max-w-lg" ref={parent}>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export { SettingsLayout };
