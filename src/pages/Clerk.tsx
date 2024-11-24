import { useSideBarRole } from "@/hooks/useSideBarRole";
import { AddClerkSheet, ClerkTable, Page, AddButton } from "@/components";
import { usePageContext, usePageState } from "@/hooks";
import { PageProvider } from "@/context";

const Clerk = () => {
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
};

const ClerkHeader = () => {
	const { handleNew } = usePageContext();

	return <AddButton onClick={handleNew}>Add New Clerk</AddButton>;
};

export { Clerk };
