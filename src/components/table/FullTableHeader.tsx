import { HTMLAttributes } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Table, flexRender } from "@tanstack/react-table";

type FullTableHeaderProps<TData> = HTMLAttributes<HTMLTableSectionElement> & {
	table: Table<TData>;
};

const FullTableHeader = <T,>({ table, ...props }: FullTableHeaderProps<T>) => {
	const [animateRef] = useAutoAnimate();

	return (
		<TableHeader {...props}>
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id} ref={animateRef}>
					{headerGroup.headers.map((header) => {
						return (
							<TableHead key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
							</TableHead>
						);
					})}
				</TableRow>
			))}
		</TableHeader>
	);
};

export { FullTableHeader };
