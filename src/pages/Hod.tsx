import { useSideBarRole } from "@/hooks/useSideBarRole";
import { AddHodSheet, HodTable, Page } from "@/components";

const Hod = () => {
  useSideBarRole();

  return (
    <Page title="Head Of Departments" Header={AddHodSheet}>
      <HodTable />
    </Page>
  );
};

export { Hod };
