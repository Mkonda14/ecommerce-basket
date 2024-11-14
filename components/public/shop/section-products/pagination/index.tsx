import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  import { useFilters } from "@/hooks/use-store";
  
  interface PaginationsProps {
    length?: number;
  }
  
  export const Paginations = ({ length = 1 }: PaginationsProps) => {
    const currentPage = useFilters((state) => state.data.page) || 1;
    const updatedPage = useFilters((state) => state.updatedPage);
  
    const totalPages = Math.ceil(length / 12);
  
    const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages) {
        updatedPage(page);
      }
    };
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                onClick={() => handlePageChange(idx + 1)}
                className="cursor-pointer"
                isActive={idx + 1 === currentPage}
                aria-disabled={idx + 1 === currentPage}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  