import { useSearchParams } from "react-router-dom";

declare module "react-router-dom" {
  interface URLSearchParams {
    get(name: "_id"): string | null;
    get(name: "action"): "create" | "update" | "delete" | null;
  }
}

const usePageParams = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("action");
  const dataId = searchParams.get("_id");

  const isDeleting = status === "delete";
  const isUpdating = status === "update";
  const isCreating = status === "create";

  return { dataId, status, isDeleting, isCreating, isUpdating };
};

export { usePageParams };
