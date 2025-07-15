import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const baseClass =
	"group toast group-[.toaster]:bg-background group-[.toaster]:border-border group-[.toaster]:shadow-lg";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: cn(baseClass, "group-[.toaster]:text-foreground"),
					error: cn(baseClass, "group-[.toaster]:!text-red-500"),
					success: cn(baseClass, "group-[.toaster]:!text-green-500"),
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
