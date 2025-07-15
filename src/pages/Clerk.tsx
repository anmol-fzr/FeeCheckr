import { useSideBarRole } from "@/hooks/useSideBarRole";
import { AddClerkSheet, ClerkTable, Page, AddButton } from "@/components";
import { PageProvider } from "@/context";
import { usePageContext, usePageState } from "@/hooks";

export function Clerk() {
	const value = usePageState();
	useSideBarRole();

	return (
		<PageProvider value={value}>
			<Page title="Clerk" Header={ClerkHeader}>
				<ClerkTable />
			</Page>
			<AddClerkSheet />
		</PageProvider>
	);
}

function ClerkHeader() {
	const { handleNew } = usePageContext();

	return <AddButton onClick={handleNew}>Add New Clerk</AddButton>;
}
