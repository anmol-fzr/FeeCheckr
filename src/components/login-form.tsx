import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useId } from "react";
import { loginSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/service";
import { InferType } from "yup";
import { useAuthStore } from "@/store";

type LoginForm = InferType<typeof loginSchema>;
const updateCreds = useAuthStore.getState().updateCreds;

export function LoginForm() {
	const id = useId();
	const navigate = useNavigate();

	const methods = useForm({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			email: "ainsa2279@gmail.com",
			password: "admin",
			//password: "2a4f@sd",
		},
	});

	const { handleSubmit } = methods;

	const { mutate } = useMutation({
		mutationFn: API.AUTH.LOGIN,
		onSuccess(res) {
			console.log({ res });
			const { token, role, name, email } = res.data;

			updateCreds({
				isLogin: true,
				token,
				role,
				name,
				email,
			});

			toast.success(res.message, { id });
			navigate("/");
		},
		onError(err) {
			toast.error(err.message, { id });
		},
	});

	const onSubmit = (data: LoginForm) => {
		toast.loading("Login ...", { id });
		mutate(data);
	};

	return (
		<Card className="mx-auto max-w-md w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email and password below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FormProvider {...methods}>
					<form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
						<FormInput
							label="Email"
							type="email"
							name="email"
							placeholder="m@example.com"
						/>
						<FormInput label="Password" type="password" name="password" />
						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</FormProvider>
			</CardContent>
		</Card>
	);
}
