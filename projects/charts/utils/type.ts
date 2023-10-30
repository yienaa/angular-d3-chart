export const isDate = (data: string): boolean => {
    if (!isNaN(new Date(data).getTime())) {
        return true;
    }
    return false;
}

export const isNumber = (data: string): boolean => {
    return isNumber(data);
}