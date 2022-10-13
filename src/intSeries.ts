/**
 * @param intSeries { string } - A string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '').
 * @throws Will throw an error if intSeries is an invalid format.
 */
function intSeriesTest(intSeries: string): void {
    const validCharacters = /^[0-9\-,]+$/;
    if (!validCharacters.test(intSeries)
        && intSeries.toUpperCase() !== 'NONE'
        && intSeries.toUpperCase() !== ''
        && intSeries.toUpperCase() !== 'ALL') {
        throw new Error(`Invalid intSeries ${intSeries}`);
    }
}

/**
 * @param intSeries { string } A string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '').
 * @returns Set A set with the values in the string.
 * @throws Will throw an error if intSeries is an invalid format.
 */
function intSeriesToSet(intSeries: string): Set<number>{
    intSeriesTest(intSeries);
    const valuesSet = new Set<number>();
    if (intSeries.toUpperCase() === 'NONE' || intSeries === '') return valuesSet;
    // TODO can probably use reduce here.
    intSeries.split(',').forEach((e) => {
        const items = e.split('-');
        if (items.length === 1) {
            valuesSet.add(+e);
        } else {
            if (+items[0] > +items[1]) {
                throw new Error(`Bad range ${items[0]}-${items[1]}`);
            }
            for (let i = +items[0]; i <= +items[1]; i++) {
                valuesSet.add(+i);
            }
        }
    });
    return valuesSet;
}

/**
 * @param { Set<number> | Array<number>} intCollection  A set or array of integers.
 * @returns { string }  string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '') representing the values in
 * the collection.
 */
function intCollectionToString(intCollection: Set<number> | Array<number>): string {
    return [...intCollection]
        .sort((a, b) => a - b)
        .reduce((acc, element, index, theArray) => {
            if (index === 0) {
                return `${element}`;
            }
            if (theArray[index - 1] === element - 1) {
                if (acc.substring(acc.length - 1) !== '-') {
                    acc+= '-';
                }
                if (index + 1 === theArray.length) {
                    acc+= `${element}`;
                }
                return acc;
            }

            if (acc.substring(acc.length - 1) === '-') {
                acc+= `${theArray[index - 1]}`;
            }
            return `${acc},${element}`;
        }, '');
}

/**
 *
 * @param {number} maxValue Largest possible value.
 * @param { string } intSeries  A string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '').
 * @param {number} value Value to remove from intSeries.
 * @returns {string} New intSeries.
 * @throws Will throw an error if intSeries is an invalid format.
 */
function intSeriesRemoveValue(maxValue: number, intSeries: string, value: number): string {
    intSeriesTest(intSeries);
    if (intSeries.toUpperCase() === 'NONE' || '') return (intSeries);
    if (intSeries.toUpperCase() === 'ALL') intSeries = `0-${maxValue}`;
    const tempSet = intSeriesToSet(intSeries);
    tempSet.delete(value);
    return intCollectionToString(tempSet);
}

/**
 *
 * @param { string } intSeries  A string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '').
 * @param {number} value Value to add to intSeries.
 * @returns {string} New intSeries.
 * @throws Will throw an error if intSeries is an invalid format.
 */
function intSeriesAddValue(intSeries: string, value: number): string {
    intSeriesTest(intSeries);
    if (intSeries.toUpperCase() === 'ALL') return (intSeries);
    const tempSet = intSeriesToSet(intSeries);
    tempSet.add(value);
    return intCollectionToString(tempSet);
}

/**
 *
 * @param { string } intSeries1 A string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '').
 * @param { string } intSeries2 A string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '').
 * @returns {boolean} A boolean that reflects if any values of intSeries1 are in intSeries2.
 * @throws Will throw an error if intSeries1 or intSeries2 is an invalid format.
 */
function intSeriesOverlap(intSeries1: string, intSeries2: string): boolean {
    intSeriesTest(intSeries1);
    intSeriesTest(intSeries2);
    if (intSeries1.toUpperCase() === 'NONE'
        || intSeries2.toUpperCase() === 'NONE'
        || intSeries1.toUpperCase() === ''
        || intSeries2.toUpperCase() === '') return false;

    if (intSeries1.toUpperCase() === 'ALL'
        || intSeries2.toUpperCase() === 'ALL') return true;

    const list1Array = [...intSeriesToSet(intSeries1)];
    const list2Set = intSeriesToSet(intSeries2);
    return list1Array.some((element) => list2Set.has(element));
}

/**
 *
 * @param { string } intSeries A string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '').
 * @param {number} value Value to search for in intSeries.
 * @returns {boolean} Result of searching for value in intSeries.
 * @throws Will throw an error if intSeries is an invalid format.
 */
function intSeriesHas(intSeries: string, value: number): boolean {
    intSeriesTest(intSeries);

    if (intSeries.toUpperCase() === 'ALL') {
        return true;
    }
    if (intSeries.toUpperCase() === 'NONE' || intSeries === '') {
        return false;
    }
    return intSeries.split(',').some((element) => {
        const values = element.split('-');
        if (values.length === 1) {
            values.push(values[0]);
        }
        if (+values[1] < +values[0]) {
            throw new Error(`Invalid range ${element}`);
        }
        return (+value >= +values[0] && +value <= +values[1]);
    });
}

export {
    intSeriesHas,
    intSeriesAddValue,
    intSeriesRemoveValue,
    intCollectionToString,
    intSeriesTest,
    intSeriesToSet,
    intSeriesOverlap,
}





