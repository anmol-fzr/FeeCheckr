import { Button, ButtonProps } from "@/components";
import { Plus } from "lucide-react";

type AddButtonProps = ButtonProps & {
	onClick: () => void;
};

export function AddButton(props: AddButtonProps) {
	return (
		<Button type="button" {...props}>
			<Plus />
			{props.children}
		</Button>
	);
}
