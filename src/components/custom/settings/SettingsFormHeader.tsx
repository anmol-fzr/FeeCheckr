type SettingFormHeaderProps = {
	title: string;
	desc: string;
};

const SettingFormHeader = ({ title, desc }: SettingFormHeaderProps) => {
	return (
		<div>
			<h3 className="text-lg font-medium">{title}</h3>
			<p className="text-sm text-muted-foreground">{desc}</p>
		</div>
	);
};

export { SettingFormHeader };
