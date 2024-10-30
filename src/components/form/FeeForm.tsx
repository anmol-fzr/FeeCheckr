import { Button, FormInput, FormSelect } from "@/components";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { API } from "@/service";
import { IReqUpdateFee, IResGetFees, ServerError } from "@/types";
import { toast } from "sonner";
import { usePageContext, usePageParams } from "@/hooks";
import { useBaseForm } from "./useBaseForm";
import { findFromInfiniteData } from "@/utils";
import { feeStatusOptions } from "@/utils/options";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateFeeSchema } from "@/schema";

let id = "fee_form";

const fetchFeeById = async (dataId: string) => {
  try {
    return (await API.FEES.ONE(dataId)).data;
  } catch (err) {
    const error = err as ServerError;
    toast.error(error.message);
    return {};
  }
};

const queryKey = ["FEES"];

const useBaseFeeForm = () => {
  return useBaseForm(id, { queryKey });
};

const useUpdateDeleteForm = () => {
  const queryClient = useQueryClient();

  const { dataId } = usePageParams();

  const methods = useForm({
    resolver: yupResolver(updateFeeSchema),
    defaultValues: async () => {
      if (!dataId) {
        return {};
      }

      const feeCache: InfiniteData<IResGetFees> | undefined =
        queryClient.getQueryData(queryKey);

      if (feeCache === undefined) {
        return await fetchFeeById(dataId);
      }

      const obj = findFromInfiniteData(feeCache, ({ _id }) => _id === dataId);

      if (obj === undefined) {
        return await fetchFeeById(dataId);
      }
      return obj;
    },
  });

  return methods;
};

const FeeForm = () => {
  const { onError, onSuccess } = useBaseFeeForm();
  const { dataId } = usePageParams();
  const methods = useUpdateDeleteForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IReqUpdateFee) => API.FEES.UPDATE(dataId, data),
    onError,
    onSuccess,
  });

  const onSubmit: SubmitHandler<IReqUpdateFee> = (data) => {
    toast.loading("Updating Fee ...", { id });
    mutate(data);
  };

  return <BaseFeeForm {...{ methods, onSubmit, isPending }} />;
};

type BaseFeeFormProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  isPending: boolean;
};

const BaseFeeForm = <T extends FieldValues>({
  methods,
  onSubmit,
  isPending,
}: BaseFeeFormProps<T>) => {
  const { handleSubmit } = methods;

  const { onOpenChange } = usePageContext();

  const commonProps = {
    type: "submit",
    className: "w-full",
    disabled: isPending,
  } as const;

  const onCancel = () => onOpenChange(false);

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="amount" label="Amount" disabled />
        <FormInput name="sbCollRef" label="SB Collect Ref" disabled />
        <FormInput name="feeType" label="Fee Type" disabled />
        <FormSelect name="status" label="Status" options={feeStatusOptions} />
        <div className="mt-4">
          <div className="flex gap-4">
            <Button
              {...commonProps}
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button {...commonProps}>Update</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export { FeeForm };
