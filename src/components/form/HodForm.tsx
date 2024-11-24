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
import {
	InfiniteData,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { API } from "@/service";
import {
	IReqCreateAdmin,
	IReqUpdateAdmin,
	IResGetAdmins,
	ServerError,
} from "@/types";
import { toast } from "sonner";
import { usePageContext, usePageParams } from "@/hooks";
import { useBaseForm } from "./useBaseForm";
import { findFromInfiniteData } from "@/utils";

const id = "add_hod_sheet";
const queryKey = ["ADMIN"] as const;

const fetchAdminById = async (dataId: string) => {
	try {
		return (await API.ADMIN.ONE(dataId)).data;
	} catch (err) {
		const error = err as ServerError;
		toast.error(error.message);
		return {};
	}
};

const useUpdateDeleteForm = () => {
	const queryClient = useQueryClient();

	const { isDeleting, dataId } = usePageParams();

	const methods = useForm({
		resolver: yupResolver(updateHodSchema),
		defaultValues: async () => {
			if (!dataId) {
				return {};
			}

			const hodCache: InfiniteData<IResGetAdmins> | undefined =
				queryClient.getQueryData(["ADMIN"]);

			if (hodCache === undefined) {
				return await fetchAdminById(dataId);
			}

			const obj = findFromInfiniteData(hodCache, ({ _id }) => _id === dataId);
			if (obj === undefined) {
				return await fetchAdminById(dataId);
			}
			return obj;
		},
		disabled: isDeleting,
	});

	return methods;
};

const HodForm = () => {
	const { isCreating, isDeleting, isUpdating } = usePageParams();

	return (
		<>
			{isCreating && <AddHodForm />}
			{isUpdating && <UpdateHodForm />}
			{isDeleting && <DeleteHodForm />}
		</>
	);
};

const AddHodForm = () => {
	const { onError, onSuccess } = useBaseForm(id, { queryKey });

	const methods = useForm({
		resolver: yupResolver(newHodSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: API.ADMIN.CREATE,
		mutationKey: ["ADMIN", "CREATE"],
		onError,
		onSuccess,
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
	const { onError, onSuccess } = useBaseForm(id, { queryKey });

	const { dataId } = usePageParams();

	const methods = useUpdateDeleteForm();

	const {
		formState: { dirtyFields },
	} = methods;

	const { mutate, isPending } = useMutation({
		mutationFn: (data: IReqUpdateAdmin) => API.ADMIN.UPDATE(dataId, data),
		mutationKey: ["ADMIN", "UPDATE"],
		onError,
		onSuccess,
	});

	const onSubmit: SubmitHandler<IReqUpdateAdmin> = (data) => {
		if (data.mobile) {
			data.mobile = Number(data.mobile);
		}
		const payload: Partial<IReqUpdateAdmin> = {};
		Object.keys(dirtyFields).forEach((key: keyof IReqUpdateAdmin) => {
			payload[key] = data[key];
		});
		toast.loading("Updating HOD ...", { id });
		mutate(payload);
	};

	return <BaseHodForm {...{ methods, onSubmit, isPending }} />;
};

const DeleteHodForm = () => {
	const { onError, onSuccess } = useBaseForm(id, { queryKey });

	const { dataId } = usePageParams();

	const methods = useUpdateDeleteForm();

	const { mutate, isPending } = useMutation({
		mutationFn: () => API.ADMIN.DELETE(dataId),
		mutationKey: ["ADMIN", "DELETE"],
		onError,
		onSuccess,
	});

	const onSubmit = () => {
		toast.loading("Deleting HOD ...", { id });
		mutate();
	};

	return <BaseHodForm {...{ methods, onSubmit, isPending }} />;
};

type BaseHodFormProps<T extends FieldValues> = {
	methods: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
	isPending: boolean;
};

const BaseHodForm = <T extends FieldValues>({
	methods,
	onSubmit,
	isPending,
}: BaseHodFormProps<T>) => {
	const deptOpts = useMetaStore((state) => state.depts);

	const { isDeleting, isUpdating, isCreating } = usePageParams();

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
			<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
				<FormInput name="name" label="Name" />
				<FormInput name="mobile" label="Mobile" type="number" />
				<FormInput name="email" label="Email Address" type="email" />
				<FormInput name="password" label="Password" type="text" />
				<FormSelect name="deptId" options={deptOpts} label="Department" />
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
						{isDeleting && (
							<Button {...commonProps} variant="destructive">
								Delete
							</Button>
						)}{" "}
						{isCreating && <Button {...commonProps}>Submit</Button>}{" "}
						{isUpdating && <Button {...commonProps}>Update</Button>}
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export { AddHodForm, HodForm };
