import { useSideBarRole } from "@/hooks/useSideBarRole";
import { StudentTable, Page, TableProvider } from "@/components";
import { usePageState } from "@/hooks";
import { PageProvider } from "@/context";

const Student = () => {
  const value = usePageState();
  useSideBarRole();

  return (
    <PageProvider value={value}>
      <Page title="Students" Header={() => <></>}>
        <TableProvider>
          <StudentTable />
        </TableProvider>
      </Page>
    </PageProvider>
  );
};

export { Student };
