export const getPageCount = (totalCount: number, limit: number): number => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages: number): number[] => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i);
    }

    return result;
}