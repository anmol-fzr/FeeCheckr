import { useSideBarRole } from "@/hooks/useSideBarRole";
import { Page } from "@/components";

const SuperAdmin = () => {
	useSideBarRole();

	return (
		<Page title="Super Admins" Header={() => <></>}>
			Yet to Impliment
		</Page>
	);
};

export { SuperAdmin };
