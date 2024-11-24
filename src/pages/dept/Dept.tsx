import { useSideBarRole } from "@/hooks/useSideBarRole";
import { AddDeptSheet, DeptTable, Page } from "@/components";

const Dept = () => {
	useSideBarRole();

	return (
		<Page title="Departments" Header={AddDeptSheet}>
			<DeptTable />
		</Page>
	);
};

export { Dept };
