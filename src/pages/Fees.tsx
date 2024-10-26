import { useSideBarRole } from "@/hooks/useSideBarRole";
import { StudentFeeTable, Page } from "@/components";
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
    </PageProvider>
  );
};

export { FeesPage };
