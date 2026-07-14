type PaginationProps = {
    startIndex: number;
    itemsPerPage: number;
    totalItems: number;
};

export function getPagination({
    startIndex,
    itemsPerPage,
    totalItems,
}: PaginationProps) {
    const endIndex = startIndex + itemsPerPage;

    return {
        endIndex,
        hasPrevious: startIndex > 0,
        hasNext: endIndex < totalItems,
    };
}