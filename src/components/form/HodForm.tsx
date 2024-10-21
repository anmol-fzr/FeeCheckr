import { Button, FormInput, FormSelect } from "@/components";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { useMetaStore } from "@/store";
import { newHodSchema, updateHodSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/service";
import { IReqCreateAdmin, IReqUpdateAdmin, IResGetAdmins } from "@/types";
import { toast } from "sonner";
import { usePageContext, usePageParams } from "@/hooks";

let id = "add_hod_sheet";

const HodForm = () => {
  const { isCreating, isDeleting, isUpdating } = usePageParams();

  return (
    <>
      {isCreating && <AddHodForm />}
      {isUpdating && <UpdateHodForm />}
    </>
  );
};

const AddHodForm = () => {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(newHodSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: API.ADMIN.CREATE,
    mutationKey: ["ADMIN", "CREATE"],
    onError(err) {
      toast.error(err.response.data.message, { id });
    },
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ["ADMIN"],
      });
      toast.success(res.message, { id });
    },
  });

  const onSubmit = (data: IReqCreateAdmin) => {
    if (data.mobile) {
      data.mobile = Number(data.mobile);
    }
    toast.loading("Adding New HOD ...", { id });
    mutate(data);
  };

  return (
    <BaseHodForm methods={methods} onSubmit={onSubmit} isPending={isPending} />
  );
};

const UpdateHodForm = () => {
  const queryClient = useQueryClient();

  const { dataId } = usePageParams();
  const { onOpenChange } = usePageContext();

  const methods = useForm({
    resolver: yupResolver(updateHodSchema),
    defaultValues: async () => {
      const hodCache: IResGetAdmins | undefined = queryClient.getQueryData([
        "ADMIN",
      ]);

      if (hodCache) {
        const obj = hodCache.data.find(({ _id }) => _id === dataId);
        obj.deptId = obj?.dept._id;
        return obj;
      }
    },
  });

  const {
    formState: { dirtyFields },
  } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IReqUpdateAdmin) => API.ADMIN.UPDATE(dataId, data),
    mutationKey: ["ADMIN", "UPDATE"],
    onError(err) {
      toast.error(err.response.data.message, { id });
    },
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ["ADMIN"],
      });
      toast.success(res.message, { id });
      onOpenChange(false);
    },
  });

  const onSubmit = (data: IReqUpdateAdmin) => {
    if (data.mobile) {
      data.mobile = Number(data.mobile);
    }
    const payload = {};
    Object.keys(dirtyFields).map((key) => {
      payload[key] = data[key];
    });
    toast.loading("Updating HOD ...", { id });
    mutate(payload);
  };

  return <BaseHodForm {...{ methods, onSubmit, isPending }} />;
};

type BaseHodFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = {
  methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  onSubmit: TTransformedValues extends undefined
    ? SubmitHandler<TFieldValues>
    : TTransformedValues extends FieldValues
      ? SubmitHandler<TTransformedValues>
      : never;
  isPending: boolean;
};

const BaseHodForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  methods,
  onSubmit,
  isPending,
}: BaseHodFormProps<TFieldValues, TContext, TTransformedValues>) => {
  const deptOpts = useMetaStore((state) => state.depts);

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="name" label="Name" />
        <FormInput name="mobile" label="Mobile" type="number" />
        <FormInput name="email" label="Email Address" type="email" />
        <FormInput name="password" label="Password" type="text" />
        <FormSelect name="deptId" options={deptOpts} label="Department" />
        <div className="mt-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export { AddHodForm, HodForm };
