import { ComponentType, Fragment } from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
	Badge,
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Separator,
	StatusBadge,
} from "@/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { BadgeProps } from "@/components/ui/badge";

interface DataTableFacetedFilterProps {
	title?: string;
	options: {
		label: string;
		value: string;
		helper?: string;
		icon?: ComponentType<{ className?: string }>;
	}[];
	selected: Set<string>;
	hideSearch?: boolean;
}

const FilterBadge = (props: BadgeProps) => (
	<Badge
		variant="secondary"
		className="rounded-sm px-1 font-normal"
		{...props}
	/>
);

export function FacetedFilter({
	title,
	options,
	selected,
	hideSearch = false,
}: DataTableFacetedFilterProps) {
	const [animateRef] = useAutoAnimate();

	const selSize = selected?.size;
	const haveValues = selSize > 0;
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="border-dashed">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{title}
					{haveValues && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selSize}
							</Badge>
							<div className="hidden space-x-1 lg:flex" ref={animateRef}>
								{selSize === options.length ? (
									<FilterBadge>All</FilterBadge>
								) : selSize > 2 ? (
									<FilterBadge>{selSize} selected</FilterBadge>
								) : (
									options
										.filter((option) => selected.has(option.value))
										.map(({ label, value }) => {
											return (
												<Fragment key={label}>
													{typeof value === "boolean" ? (
														<StatusBadge
															variant={value ? "green" : "red"}
															className="rounded-sm px-1 font-normal"
														>
															{label}
														</StatusBadge>
													) : (
														<FilterBadge>{label}</FilterBadge>
													)}
												</Fragment>
											);
										})
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					{!hideSearch && (
						<CommandInput placeholder={title} className="border-none" />
					)}
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selected.has(option.value);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											const curr = selected;
											if (isSelected) {
												curr.delete(option.value);
											} else {
												curr.add(option.value);
											}
											return curr;
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible",
											)}
										>
											<CheckIcon className={cn("h-4 w-4")} />
										</div>
										{option.icon && (
											<option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
										)}
										<span>{option.label}</span>
										<span className="text-muted-foreground">
											{option.helper}
										</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{haveValues && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={selected.clear}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export type { DataTableFacetedFilterProps };
