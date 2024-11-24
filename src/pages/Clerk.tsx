import { useSideBarRole } from "@/hooks/useSideBarRole";
import { Button, AddClerkSheet, ClerkTable, Page } from "@/components";
import { usePageContext, usePageState } from "@/hooks";
import { PageProvider } from "@/context";
import { Plus } from "lucide-react";

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

	return (
		<Button onClick={handleNew} type="button">
			<Plus />
			Add New Clerk
		</Button>
	);
};

export { Clerk };
