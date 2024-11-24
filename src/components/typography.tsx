import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type H1Props = ComponentPropsWithoutRef<"h1">;

const PageTitle = (props: H1Props) => <H1 {...props} />;

const H1 = (props: H1Props) => {
	const className = cn(
		"text-4xl font-extrabold tracking-tight lg:text-5xl",
		props.className,
	);
	return <h1 className={className} {...props} />;
};

type H2Props = ComponentPropsWithoutRef<"h2">;

const H2 = (props: H2Props) => {
	const className = cn(
		"border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
		props.className,
	);
	return <h2 className={className} {...props} />;
};

type H3Props = ComponentPropsWithoutRef<"h3">;

const H3 = (props: H3Props) => {
	const className = cn(
		"text-2xl font-semibold tracking-tight",
		props.className,
	);
	return <h3 className={className} {...props} />;
};

type H4Props = ComponentPropsWithoutRef<"h4">;

const H4 = (props: H4Props) => {
	const className = cn("text-xl font-semibold tracking-tight", props.className);
	return <h4 className={className} {...props} />;
};

type PProps = ComponentPropsWithoutRef<"p">;

const P = (props: PProps) => {
	const className = cn("leading-7 [&:not(:first-child)]:mt-6", props.className);
	return <p className={className} {...props} />;
};

export { H1, H2, H3, H4, P, PageTitle };
