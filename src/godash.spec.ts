import {
    camelCase,
    capitalize,
    cloneDeep,
    debounce,
    flatten,
    get,
    isBoolean,
    isEqual,
    isNumber,
    isObject,
    isString,
    mapValues,
    max,
    merge,
    mergeDeep,
    pickBy,
    set,
    snakeCase,
    throttle,
    uniq,
    upperFirst,
    _isEmpty,
} from './godash';

describe('isEqual', () => {
    it('basic', () => {
        expect(
            isEqual(
                {
                    a: 1,
                },
                {
                    a: 1,
                }
            )
        ).toBe(true);

        expect(
            isEqual(
                {
                    a: 1,
                },
                {
                    a: 2,
                }
            )
        ).toBe(false);
    });
});

describe('camelCase', () => {
    it('basic', () => {
        expect(camelCase('good-stuff')).toEqual('goodStuff');
        expect(camelCase('GoodStuff')).toEqual('goodStuff');
    });
});

describe('max', () => {
    it('basic', () => {
        expect(max([10, 5, 8, 3, 16, 1])).toEqual(16);
    });
});

describe('merge', () => {
    it('basic', () => {
        expect(merge({ a: 1 }, { b: 2 })).toEqual({
            a: 1,
            b: 2,
        });
    });
});

describe('get', () => {
    it('basic', () => {
        const obj = {
            a: {
                b: 2,
            },
        };
        expect(get(obj, null)).toEqual(obj);
        expect(get(obj, undefined)).toEqual(obj);
        expect(get(obj, 'a.b')).toEqual(2);
        expect(get(obj, ['a', 'b'])).toEqual(2);
        expect(get(obj, ['a', 'c'])).toEqual(undefined);
        expect(get(obj, ['a', 'c'], 3)).toEqual(3);
    });
});

describe('set', () => {
    it('basic', () => {
        const obj = {
            a: {
                b: 2,
            },
        };

        set(obj, null, 3);
        expect(obj).toEqual(obj);

        set(obj, undefined, 3);
        expect(obj).toEqual(obj);

        set(obj, 'a.b', 3);
        expect(obj).toEqual({
            a: {
                b: 3,
            },
        });

        set(obj, ['a', 'b'], 4);
        expect(obj).toEqual({
            a: {
                b: 4,
            },
        });

        set(obj, ['a', 'c'], null);

        expect(obj).toEqual({
            a: {
                b: 4,
                c: null,
            },
        });

        set(obj, ['a', 'c'], undefined);

        expect(obj).toEqual({
            a: {
                b: 4,
                c: undefined,
            },
        });
    });

    it('create', () => {
        const obj = {};

        set(obj, 'a.b', 3);
        expect(obj).toEqual({
            a: {
                b: 3,
            },
        });

        set(obj, ['a', 'b'], 4);
        expect(obj).toEqual({
            a: {
                b: 4,
            },
        });

        set(obj, ['a', 'c'], null);

        expect(obj).toEqual({
            a: {
                b: 4,
                c: null,
            },
        });
    });
});

describe('uniq', () => {
    it('basic', () => {
        expect(uniq([10, 5, 5, 8, 3, 16, 10]).sort()).toEqual(
            [10, 5, 8, 3, 16].sort()
        );
    });
});
describe('upperFirst', () => {
    it('basic', () => {
        expect(upperFirst('nice')).toEqual('Nice');
    });
});

describe('snakeCase', () => {
    it('basic', () => {
        expect(snakeCase('GoodStuff')).toEqual('good_stuff');
        expect(snakeCase('goodStuff')).toEqual('good_stuff');
    });
});
describe('pickBy', () => {
    it('basic', () => {
        const obj = {
            '1': {
                id: '1',
                price: 10,
            },
            '2': {
                id: '2',
                price: 20,
            },
        };

        expect(
            pickBy(obj, (item) => {
                return item.price > 10;
            })
        ).toEqual({
            '2': {
                id: '2',
                price: 20,
            },
        });
    });
});

describe('mapValues', () => {
    it('basic', () => {
        const obj = {
            '1': {
                id: '1',
                price: 10,
            },
            '2': {
                id: '2',
                price: 20,
            },
        };

        expect(
            mapValues(obj, (item) => {
                return {
                    ...item,
                    isExpensive: item.price > 10,
                };
            })
        ).toEqual({
            '1': {
                id: '1',
                price: 10,
                isExpensive: false,
            },
            '2': {
                id: '2',
                price: 20,
                isExpensive: true,
            },
        });
    });
});

describe('_isEmpty', () => {
    it('basic', () => {
        expect(_isEmpty({})).toEqual(true);
        expect(
            _isEmpty({
                a: 5,
            })
        ).toEqual(false);
    });
});

describe('capitalize', () => {
    it('basic', () => {
        expect(capitalize('good')).toEqual('Good');
        expect(capitalize('GOOD')).toEqual('Good');
    });
});

describe('flatten', () => {
    it('basic', () => {
        expect(
            flatten([
                [1, 2],
                [4, 5],
                [7, 8],
            ])
        ).toEqual([1, 2, 4, 5, 7, 8]);
    });
});

describe('isBoolean', () => {
    it('basic', () => {
        expect(isBoolean(true)).toEqual(true);
        expect(isBoolean(false)).toEqual(true);
        expect(isBoolean('true')).toEqual(false);
        expect(isBoolean(undefined)).toEqual(false);
        expect(isBoolean(null)).toEqual(false);
        expect(isBoolean(0)).toEqual(false);
    });
});

describe('isNumber', () => {
    it('basic', () => {
        expect(isNumber(0)).toEqual(true);
        expect(isNumber(1.2)).toEqual(true);
        expect(isNumber(true)).toEqual(false);
        expect(isNumber('1')).toEqual(false);
    });
});

describe('isString', () => {
    it('basic', () => {
        expect(isString(0)).toEqual(false);
        expect(isString('a')).toEqual(true);
        expect(isString('')).toEqual(true);
        expect(isString('1')).toEqual(true);
        expect(isString({})).toEqual(false);
    });
});

describe('isObject', () => {
    it('basic', () => {
        expect(isObject(0)).toEqual(false);
        expect(isObject('a')).toEqual(false);
        expect(isObject('')).toEqual(false);
        expect(isObject('1')).toEqual(false);
        expect(isObject([])).toEqual(false);
        expect(isObject({})).toEqual(true);
        expect(isObject({ a: 5 })).toEqual(true);
    });
});

describe('cloneDeep', () => {
    it('basic', () => {
        const obj1 = {
            a: {
                b: {
                    c: 3,
                },
            },
        };

        expect(cloneDeep(obj1)).toEqual({
            a: {
                b: {
                    c: 3,
                },
            },
        });
    });
});

describe('debounce', () => {
    it('basic', async () => {
        const fn = jest.fn();
        const debouncedFn = debounce(fn, 10);
        debouncedFn();
        debouncedFn();
        expect(fn).toHaveBeenCalledTimes(0);
        await delay(20);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('two calls', async () => {
        const fn = jest.fn();
        const debouncedFn = debounce(fn, 10);
        debouncedFn();
        debouncedFn();
        expect(fn).toHaveBeenCalledTimes(0);
        await delay(20);
        debouncedFn();
        expect(fn).toHaveBeenCalledTimes(1);
        await delay(20);
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it('parameters', async () => {
        const fn = jest.fn();
        const debouncedFn = debounce(fn, 10);
        debouncedFn(1, 2);
        await delay(20);
        expect(fn).toHaveBeenCalledWith(1, 2);
    });
});

describe('throttle', () => {
    it('basic', async () => {
        const fn = jest.fn();
        const throttledFn = throttle(fn, 10);
        throttledFn();
        throttledFn();
        throttledFn();
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('two calls', async () => {
        const fn = jest.fn();
        const throttledFn = throttle(fn, 10);
        throttledFn();
        throttledFn();
        await delay(20);
        throttledFn();
        throttledFn();
        throttledFn();
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it('parameters', async () => {
        const fn = jest.fn();
        const throttledFn = throttle(fn, 10);
        throttledFn(1, 2);
        expect(fn).toHaveBeenCalledWith(1, 2);
    });
});

describe('mergeDeep', () => {
    it('basic', () => {
        const obj1 = {
            a: {
                b: {
                    c: 3,
                },
            },
        };

        const obj2 = {
            b: 3,
            a: {
                b: {
                    a: 1,
                },
                c: {
                    d: 2,
                    e: [1, 2, 3],
                },
            },
        };

        expect(mergeDeep(obj1, obj2)).toEqual({
            a: {
                b: {
                    a: 1,
                    c: 3,
                },
                c: {
                    d: 2,
                    e: [1, 2, 3],
                },
            },
            b: 3,
        });
    });
});

const delay = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
