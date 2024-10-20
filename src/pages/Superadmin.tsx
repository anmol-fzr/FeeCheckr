import { useSideBarRole } from "@/hooks/useSideBarRole";
import { AddHodSheet, ClerkTable, Page } from "@/components";

const SuperAdmin = () => {
  useSideBarRole();

  return (
    <Page title="Super Admins" Header={AddHodSheet}>
      <ClerkTable />
    </Page>
  );
};

export { SuperAdmin };
