import { useSideBarRole } from "@/hooks/useSideBarRole";
import { StudentFeeTable, Page, FeeSheet } from "@/components";
import { usePageState } from "@/hooks";
import { PageProvider } from "@/context";

const FeesPage = () => {
	const value = usePageState();
	useSideBarRole();

	return (
		<PageProvider value={value}>
			<Page title="Student's Fee" Header={() => <></>}>
				<StudentFeeTable />
			</Page>
			<FeeSheet />
		</PageProvider>
	);
};

export { FeesPage };
