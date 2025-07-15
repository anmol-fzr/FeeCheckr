import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useId } from "react";
import { updateAccountSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/service";
import { InferType } from "yup";
import { useAuthStore } from "@/store";

type LoginForm = InferType<typeof updateAccountSchema>;

export function UpdateAccountForm() {
	const email = useAuthStore((state) => state.creds.email);
	const id = useId();
	const navigate = useNavigate();

	const methods = useForm({
		resolver: yupResolver(updateAccountSchema),
		defaultValues: {
			email,
		},
	});

	const { handleSubmit } = methods;

	const { mutate } = useMutation({
		mutationFn: API.AUTH.UPDATE,
		onSuccess(res) {
			methods.reset();
			toast.success(res.message, { id });
		},
		onError(err) {
			toast.error(err.message, { id });
		},
	});

	const onSubmit = (data: LoginForm) => {
		toast.loading("Updating ...", { id });
		mutate(data);
	};

	return (
		<FormProvider {...methods}>
			<form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					label="Email"
					type="email"
					name="email"
					disabled
					info="Email Updates are not disabled"
					placeholder="m@example.com"
				/>
				<FormInput
					label="Password"
					name="password"
					placeholder="New Password"
					info="This will Update you password"
				/>
				<Button type="submit" className="w-fit">
					Update
				</Button>
			</form>
		</FormProvider>
	);
}
