export const isEqual = (ob1: Object, obj2: object) => {
    return JSON.stringify(ob1) === JSON.stringify(obj2);
};

export const camelCase = (text: string) => {
    if (text.includes('-')) {
        return text.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    return lowerFirst(text);
};

export const max = (arr: any[]) => {
    return Math.max(...arr);
};

export const merge = (obj1: Object, obj2: Object) => {
    return Object.assign({}, obj1, obj2);
};

export const mergeDeep = (obj1: Object, obj2: Object) => {
    const output: any = {};

    const addObj = (obj: any, path: string[] = []) => {
        Object.keys(obj).forEach((key) => {
            const value = obj[key];

            if (!isObject(value)) {
                const xPath = path.concat(key).join('.');
                set(output, xPath, value);
            } else {
                addObj(value, path.concat(key));
            }
        });
    };

    addObj(obj1);
    addObj(obj2);

    return output;
};

export const get = (
    object: Object,
    map: string | string[],
    defaultValue?: any
) => {
    const path = Array.isArray(map) ? map : map.split('.');

    const value = path.reduce((output, key) => {
        return output && output[key] ? output[key] : undefined;
    }, object as any);

    return value === undefined ? defaultValue : value;
};

export const cloneDeep = (object: Object) => {
    return JSON.parse(JSON.stringify(object));
};

export const set = (object: Object, map: string | string[], value: any) => {
    const path = Array.isArray(map) ? map : map.split('.');

    const lastKey = path.pop();

    const lastObject = path.reduce((output, key) => {
        if (!output[key]) {
            output[key] = {};
        }

        return output[key];
    }, object as any);

    if (lastKey) {
        lastObject[lastKey] = value;
    }
};

export const uniq = (arr: any[]) => {
    return [...new Set(arr)];
};

export const lowerFirst = (text: string) => {
    return text.charAt(0).toLowerCase() + text.slice(1);
};

export const upperFirst = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const isObject = (value: any) => {
    return typeof value === 'object' && value.constructor === Object;
};

export const debounce = (method: any, time: number) => {
    let timeout: any;

    return function (...args: any[]) {
        const functionCall = () => method(...args);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    };
};

export const snakeCase = (text: string) => {
    const output = text.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);

    if (output.substring(0, 1) === '_') {
        return output.substring(1);
    }

    return output;
};

export const pickBy = <T>(
    object: Record<string, T>,
    predicate: (item: T, key: string) => boolean
) => {
    return Object.keys(object)
        .filter((key) => predicate(object[key], key))
        .reduce((output, key) => {
            output[key] = object[key];
            return output;
        }, {} as any);
};

export const mapValues = <T>(
    object: Record<string, T>,
    predicate: (item: T, key: string) => T
) => {
    return Object.keys(object).reduce((output, key) => {
        output[key] = predicate(object[key], key);
        return output;
    }, {} as any);
};

export const _isEmpty = (object: Object) => {
    return Object.keys(object).length === 0;
};

export const throttle = (method: any, time: number) => {
    let ready = true;

    return function (...args: any[]) {
        if (ready) {
            ready = false;

            method(...args);

            setTimeout(() => {
                ready = true;
            }, time);
        }
    };
};

export const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const flatten = (arr: any[]) => {
    return arr.reduce((output, item) => {
        return output.concat(item);
    }, []);
};

export const isBoolean = (obj: unknown) => {
    return typeof obj === 'boolean';
};

export const isNumber = (obj: unknown) => {
    return typeof obj === 'number';
};

export const isString = (obj: unknown) => {
    return typeof obj === 'string';
};
