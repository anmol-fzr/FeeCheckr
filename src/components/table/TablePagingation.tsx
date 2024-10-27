import { Button } from "@/components";
import { useTableContext } from "@/hooks";

const TablePagination = () => {
  const { onPrevPage, onNextPage } = useTableContext();
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="space-x-2">
        <Button variant="outline" size="sm" onClick={onPrevPage}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={onNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export { TablePagination };
