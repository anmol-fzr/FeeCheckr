import { usePageContext } from "@/hooks";
import { IRes, ServerError } from "@/types";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

const useBaseForm = (toastId: string, filters: InvalidateQueryFilters) => {
	const queryClient = useQueryClient();

	const { onOpenChange } = usePageContext();

	const onError = useCallback(
		(err: ServerError) => {
			toast.error(err.message, { id: toastId });
		},
		[toastId],
	);

	const onSuccess = useCallback(
		(res: IRes<any>) => {
			queryClient.invalidateQueries(filters);
			toast.success(res.message, { id: toastId });
			onOpenChange(false);
		},
		[filters, toastId, onOpenChange],
	);

	return { onError, onSuccess };
};

export { useBaseForm };
