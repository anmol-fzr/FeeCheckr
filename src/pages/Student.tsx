import { useSideBarRole } from "@/hooks/useSideBarRole";
import { StudentTable, Page } from "@/components";
import { usePageState } from "@/hooks";
import { PageProvider } from "@/context";

const Student = () => {
  const value = usePageState();
  useSideBarRole();

  return (
    <PageProvider value={value}>
      <Page title="Students" Header={() => <></>}>
        <StudentTable />
      </Page>
    </PageProvider>
  );
};

export { Student };
