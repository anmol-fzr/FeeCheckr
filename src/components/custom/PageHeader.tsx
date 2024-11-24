type PageHeaderProps = {
	title: string;
	desc?: string;
};

const PageHeader = ({ title, desc }: PageHeaderProps) => {
	return (
		<div className="space-y-0.5">
			<h2 className="animate-in slide-in-from-top fade-in text-3xl font-bold tracking-tight">
				{title}
			</h2>
			<p className="text-muted-foreground">{desc}</p>
		</div>
	);
};

export type { PageHeaderProps };
export { PageHeader };
