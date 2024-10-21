import { Card, DeptForm, Page } from "@/components";

const AddDeptPage = () => {
  return (
    <Page title="Edit Department">
      <Card className="max-w-sm p-4">
        <DeptForm />
      </Card>
    </Page>
  );
};

export { AddDeptPage };
