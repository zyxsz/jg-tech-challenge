import type { Pagination as PaginationType } from "@/api/interfaces/pagination.interface";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDownIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

export const usePaginationHook = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(100)
  );

  const getPaginationProps = <T,>(
    pagination: PaginationType<T>["pagination"]
  ) => {
    const hasBefore = (pagination?.page || 0) > 1;
    const hasNext = (pagination?.totalPages || 0) > (pagination?.page || 0);

    const handleChangePage = (page: number) => {
      setPage(page);
    };

    const handleNextPage = () => {
      if (!pagination) return;
      if (pagination.page >= pagination.totalPages) return;

      setPage((state) => state + 1);
    };

    const handlePrevPage = () => {
      if (!pagination) return;
      if (pagination.page <= 1) return;

      setPage((state) => state - 1);
    };

    const handleChangeLimit = (limit: 5 | 15 | 30 | 60 | 100) => {
      setLimit(limit);
    };

    return {
      hasBefore,
      hasNext,
      handleChangePage,
      handleChangeLimit,
      handleNextPage,
      handlePrevPage,
    };
  };

  // Comps

  const PaginationComp = <T,>({
    paginationData,
  }: {
    paginationData: PaginationType<T>["pagination"];
  }) => {
    const pagination = getPaginationProps(paginationData);

    return (
      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!pagination.hasBefore}
              onClick={() => pagination.handlePrevPage()}
            />
          </PaginationItem>
          {pagination.hasBefore && (
            <PaginationItem>
              <PaginationButton
                onClick={() => pagination.handleChangePage(page - 1)}
              >
                {page - 1}
              </PaginationButton>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationButton isActive>{page}</PaginationButton>
          </PaginationItem>
          {pagination.hasNext && (
            <PaginationItem>
              <PaginationButton
                onClick={() => pagination.handleChangePage(page + 1)}
              >
                {page + 1}
              </PaginationButton>
            </PaginationItem>
          )}

          <PaginationNext
            disabled={!pagination.hasNext}
            onClick={() => pagination.handleNextPage()}
          />
        </PaginationContent>
      </Pagination>
    );
  };

  const PerPageLimit = <T,>({
    paginationData,
  }: {
    paginationData: PaginationType<T>["pagination"];
  }) => {
    const pagination = getPaginationProps(paginationData);

    return (
      <p className="text-sm text-muted-foreground">
        Mostrando{" "}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              {limit}
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => pagination.handleChangeLimit(5)}>
              5
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => pagination.handleChangeLimit(15)}>
              15
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => pagination.handleChangeLimit(30)}>
              30
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => pagination.handleChangeLimit(60)}>
              60
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => pagination.handleChangeLimit(100)}>
              100
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
        resultados por página.
      </p>
    );
  };

  return {
    page,
    setPage,
    limit,
    getPaginationProps,
    Components: {
      PaginationComp,
      PerPageLimit,
    },
  };
};
