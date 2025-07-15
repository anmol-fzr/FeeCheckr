import {
	FormDescription,
	FormLabel,
	FormMessage,
	FormError,
} from "@/components";
import { Textarea, TextareaProps } from "@/components";
import { useFormContext } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cn } from "@/lib/utils";

type FormTextareaProps = TextareaProps & {
	label: string;
	name: string;
	containerClassName?: string;
	desc?: string;
};

const FormTextarea = ({
	label,
	name,
	desc,
	containerClassName,
	...props
}: FormTextareaProps) => {
	const [animate] = useAutoAnimate();

	const { register, formState } = useFormContext();
	const error = formState.errors[name]?.message?.toString();

	return (
		<div
			ref={animate}
			className={cn("flex flex-col gap-2 w-full", containerClassName)}
		>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Textarea {...register(name)} id={name} {...props} />
			{desc && <FormDescription>{desc}</FormDescription>}
			{error && <FormError>{error}</FormError>}
			<FormMessage />
		</div>
	);
};

export { FormTextarea };
