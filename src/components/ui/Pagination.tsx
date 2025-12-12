import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    hasMoreData: boolean;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, hasMoreData, onPageChange }: PaginationProps) => {
    const pages = [currentPage, currentPage + 1, currentPage + 2];

    return (
        <div className="mt-8 flex items-center justify-end gap-2 text-sm text-gray-500 font-header">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="mr-4 cursor-pointer hover:text-[#FD5725] disabled:text-gray-300 disabled:cursor-not-allowed bg-transparent border-none"
            >
                Previous
            </button>

            {pages.map((pageNum) => {
                const isFuturePageAndNoData = pageNum > currentPage && !hasMoreData;

                return (
                    <button
                        key={pageNum}
                        onClick={() => !isFuturePageAndNoData && onPageChange(pageNum)}
                        disabled={isFuturePageAndNoData}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded font-bold transition-colors",
                            currentPage === pageNum
                                ? "bg-[#FD5725] text-white shadow-sm"
                                : isFuturePageAndNoData
                                    ? "bg-transparent text-gray-300 cursor-not-allowed"
                                    : "bg-[#E0E0E0] text-gray-600 hover:bg-gray-300"
                        )}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasMoreData}
                className="ml-4 cursor-pointer hover:text-[#FD5725] disabled:text-gray-300 disabled:cursor-not-allowed bg-transparent border-none"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;