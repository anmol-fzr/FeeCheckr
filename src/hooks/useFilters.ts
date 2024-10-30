import { useSet } from "@uidotdev/usehooks";
import { useCallback } from "react";

const useFilters = <FilterKey extends string>(
  initialFilters: Record<FilterKey, string[] | readonly string[]>,
) => {
  type Filters = Record<FilterKey, ReturnType<typeof useSet<string>>>;

  const filters = Object.keys(initialFilters).reduce<Filters>((acc, key) => {
    acc[key as FilterKey] = useSet(initialFilters[key as FilterKey]);
    return acc;
  }, {} as Filters);

  const setFilter = useCallback(
    (filterKey: keyof typeof filters, value: string) => {
      if (filters[filterKey]) {
        if (filters[filterKey].has(value)) {
          filters[filterKey].delete(value);
        } else {
          filters[filterKey].add(value);
        }
      }
    },
    [filters],
  );

  const resetFilters = useCallback(() => {
    Object.keys(filters).forEach((key) => {
      filters[key as FilterKey].clear();
      initialFilters[key as FilterKey].forEach((value) => {
        filters[key as FilterKey].add(value);
      });
    });
  }, [filters, initialFilters]);

  const getFilters = useCallback(() => {
    const newFilterParams: Record<string, Array<string>> = {};

    Object.keys(filters).forEach((key) => {
      newFilterParams[key] = Array.from(filters[key as FilterKey]);
    });

    return newFilterParams;
  }, [filters]);

  return { filters, setFilter, resetFilters, getFilters };
};

export { useFilters };
