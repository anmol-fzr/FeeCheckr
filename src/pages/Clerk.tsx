import { useSideBarRole } from "@/hooks/useSideBarRole";
import { AddHodSheet, ClerkTable, Page } from "@/components";

const Clerk = () => {
  useSideBarRole();

  return (
    <Page title="Clerk" Header={AddHodSheet}>
      <ClerkTable />
    </Page>
  );
};

export { Clerk };
