import { useSideBarRole } from "@/hooks/useSideBarRole";
import { AddHodSheet, HodTable, Page, Button } from "@/components";
import { PageProvider } from "@/context";
import { usePageContext, usePageState } from "@/hooks";
import { Plus } from "lucide-react";

const Hod = () => {
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
};

const HodHeader = () => {
  const { handleNew } = usePageContext();

  return (
    <Button onClick={handleNew} type="button">
      <Plus />
      Add New HOD
    </Button>
  );
};

export { Hod };
