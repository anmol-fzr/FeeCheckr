import { useSideBarRole } from "@/hooks/useSideBarRole";
import { AddHodSheet, HodTable, Page, AddButton } from "@/components";
import { PageProvider } from "@/context";
import { usePageContext, usePageState } from "@/hooks";

export function Hod() {
	const value = usePageState();
	useSideBarRole();

	return (
		<PageProvider value={value}>
			<Page title="Head Of Departments" Header={HodHeader}>
				<HodTable />
			</Page>
			<AddHodSheet />
		</PageProvider>
	);
}

function HodHeader() {
	const { handleNew } = usePageContext();

	return <AddButton onClick={handleNew}>Add New HOD</AddButton>;
}
