export const toArray = <T = Json>(objectOrArray: T | T[]): T[] => {
    if (!objectOrArray) {
        return [];
    }
    return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
};

export const isEmpty = (object: Json | any[]) => {
    if (Array.isArray(object)) {
        return object.length === 0;
    }

    return Object.keys(object ?? {}).length === 0;
};

export const itemsToObject = (arr: Json[] = [], page = 1, pageSize = 0) => {
    return arr.reduce((output, item, index) => {
        output[item.id] = { ...item, index: index + pageSize * (page - 1) };
        return output;
    }, {} as Json);
};
