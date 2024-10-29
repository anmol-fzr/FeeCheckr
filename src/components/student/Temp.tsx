import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { API } from "@/service";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

export function Temp() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["jets"],
    queryFn: ({ pageParam }) => API.STUDENTS.GET(pageParam),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const hasNextPage =
        Math.ceil(lastPage.paginate.total / lastPageParam.size) >
        lastPageParam.page;
      return hasNextPage
        ? {
            page: lastPageParam.page + 1,
            size: lastPageParam.size,
          }
        : null;
    },
    initialPageParam: {
      page: 1,
      size: 5,
    },
  });

  const allRows = data ? data.pages.flatMap((d) => d.data) : [];
  console.log(allRows);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 5,
  });

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <div>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `500px`,
          width: `100%`,
          overflow: "auto",
        }}
      >
        <Table>
          <TableBody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const post = allRows[virtualRow.index];

              return (
                <TableRow
                  key={virtualRow.index}
                  style={{
                    height: `${virtualRow.size}px`,
                    //height: `64px`,
                  }}
                >
                  <TableCell
                    style={{
                      height: `${virtualRow.size}px`,
                      // height: "64px"
                    }}
                  >
                    {isLoaderRow
                      ? hasNextPage
                        ? "Loading more..."
                        : "Nothing more to load"
                      : post._id}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
