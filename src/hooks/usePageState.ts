import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const usePageState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get("action") !== null;

  const onClose = useCallback(() => {
    setSearchParams({});
  }, []);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose],
  );

  const handleNew = useCallback(() => {
    setSearchParams({ action: "create" });
  }, []);

  const handleEdit = useCallback((_id: string) => {
    setSearchParams({ _id, action: "update" });
  }, []);

  const handleDelete = useCallback((_id: string) => {
    setSearchParams({ _id, action: "delete" });
  }, []);

  return useMemo(
    () => ({
      isOpen,
      onOpenChange,
      handleNew,
      handleEdit,
      handleDelete,
    }),
    [isOpen, onOpenChange, handleNew, handleEdit, handleDelete],
  );
};

export { usePageState };
