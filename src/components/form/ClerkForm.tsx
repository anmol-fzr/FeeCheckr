import { Button, CancelButton, FormInput } from "@/components";
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
	UseFormReturn,
} from "react-hook-form";
import { newClerkSchema, updateClerkSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	InfiniteData,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { API } from "@/service";
import {
	IReqCreateClerk,
	IReqUpdateClerk,
	IResGetClerks,
	ServerError,
} from "@/types";
import { toast } from "sonner";
import { usePageContext, usePageParams } from "@/hooks";
import { useBaseForm } from "./useBaseForm";
import { findFromInfiniteData } from "@/utils";

const id = "clerk_form";

const queryKey = ["CLERK"];

const fetchClerkById = async (dataId: string) => {
	try {
		return (await API.CLERK.ONE(dataId)).data;
	} catch (err) {
		const error = err as ServerError;
		toast.error(error.message);
		return {};
	}
};

const useBaseClerkForm = () => {
	return useBaseForm(id, { queryKey });
};

const useUpdateDeleteForm = () => {
	const queryClient = useQueryClient();

	const { isDeleting, dataId } = usePageParams();

	const methods = useForm({
		resolver: yupResolver(updateClerkSchema),
		defaultValues: async () => {
			if (!dataId) {
				return {};
			}

			const hodCache: InfiniteData<IResGetClerks> | undefined =
				queryClient.getQueryData(queryKey);

			if (hodCache === undefined) {
				return await fetchClerkById(dataId);
			}

			const obj = findFromInfiniteData(hodCache, ({ _id }) => _id === dataId);
			if (obj === undefined) {
				return await fetchClerkById(dataId);
			}
			return obj;
		},
		disabled: isDeleting,
	});

	return methods;
};

const ClerkForm = () => {
	const { isCreating, isDeleting, isUpdating } = usePageParams();

	return (
		<>
			{isCreating && <AddClerkForm />}
			{isUpdating && <UpdateClerkForm />}
			{isDeleting && <DeleteClerkForm />}
		</>
	);
};

const AddClerkForm = () => {
	const { onError, onSuccess } = useBaseClerkForm();

	const methods = useForm({
		resolver: yupResolver(newClerkSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: API.CLERK.CREATE,
		onError,
		onSuccess,
	});

	const onSubmit = (data: IReqCreateClerk) => {
		if (data.mobile) {
			data.mobile = Number(data.mobile);
		}
		toast.loading("Adding New Clerk ...", { id });
		mutate(data);
	};

	return (
		<BaseClerkForm
			methods={methods}
			onSubmit={onSubmit}
			isPending={isPending}
		/>
	);
};

const UpdateClerkForm = () => {
	const { onError, onSuccess } = useBaseClerkForm();
	const { dataId } = usePageParams();
	const methods = useUpdateDeleteForm();

	const {
		formState: { dirtyFields },
	} = methods;

	const { mutate, isPending } = useMutation({
		mutationFn: (data: IReqUpdateClerk) => API.CLERK.UPDATE(dataId, data),
		onError,
		onSuccess,
	});

	const onSubmit: SubmitHandler<IReqUpdateClerk> = (data) => {
		if (data.mobile) {
			data.mobile = Number(data.mobile);
		}
		const payload: Partial<IReqUpdateClerk> = {};
		Object.keys(dirtyFields).forEach((key: keyof IReqUpdateClerk) => {
			payload[key] = data[key];
		});
		toast.loading("Updating Clerk ...", { id });
		mutate(payload);
	};

	return <BaseClerkForm {...{ methods, onSubmit, isPending }} />;
};

const DeleteClerkForm = () => {
	const { onError, onSuccess } = useBaseClerkForm();

	const { dataId } = usePageParams();

	const methods = useUpdateDeleteForm();

	const { mutate, isPending } = useMutation({
		mutationFn: () => API.CLERK.DELETE(dataId),
		onError,
		onSuccess,
	});

	const onSubmit = () => {
		toast.loading("Deleting Clerk ...", { id });
		mutate();
	};

	return <BaseClerkForm {...{ methods, onSubmit, isPending }} />;
};

type BaseClerkFormProps<T extends FieldValues> = {
	methods: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
	isPending: boolean;
};

const BaseClerkForm = <T extends FieldValues>({
	methods,
	onSubmit,
	isPending,
}: BaseClerkFormProps<T>) => {
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
				<FormInput
					name="password"
					label="Password"
					type="text"
					placeholder="New Password"
				/>
				<div className="mt-4">
					<div className="flex gap-4">
						<CancelButton {...commonProps} onClick={onCancel}>
							Cancel
						</CancelButton>
						{isDeleting && (
							<Button {...commonProps} variant="destructive">
								Delete
							</Button>
						)}
						{isCreating && <Button {...commonProps}>Submit</Button>}
						{isUpdating && <Button {...commonProps}>Update</Button>}
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export { ClerkForm };
