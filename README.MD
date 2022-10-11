# intSeries

JS (from typescript) code for handling a string of integer values (e.g. '1,3,5-10', 'ALL', 'NONE', '').

## Prerequisites
* ES2016 or higher.
* These modules are in ESM format.

## Installation

Use the package manager npm to install intSeries.

```bash
npm install rsunbury/intSeries
```

## Glossary
* ALL: A string of "ALL" (non case-sensitive).
* NONE: A string of "NONE" (none case-sensitive) or "".
* intSeries: A string with a series of values (e.g. '1,3,5-10', ALL or NONE).


## Functions

intSeriesTest(intSeries: string): void
* param: intSeries.
* throws: Will throw an error if intSeries is an invalid format.

intSeriesToSet(intSeries: string): Set
* param: intSeries.
* returns: { Set } A set with the values in the string.
* throws: Will throw an error if intSeries is an invalid format.

intCollectionToString(intCollection: Set | Array): string
* param: { Set<number> | Array<number>} intCollection:  A set or array of integers.
* returns: An intSeries reflecting the values in intCollection.

intSeriesRemoveValue(maxValue: number, intSeries: string, value: number): string
* param: {number} maxValue: Largest possible value. This is needed in case a value is being removed from ALL.
* param: { string } intSeries:  A string with a series of values (e.g. '1,3,5-10', 'ALL', 'NONE', '').
* param: {number} value: Value to remove from intSeries.
* returns: {string} New intSeries with value removed.
* throws: Will throw an error if intSeries is an invalid format.

intSeriesAddValue(intSeries: string, value: number): string {
* param: { string } intSeries.
* param: {number} value: Value to add to intSeries.
* returns: {string} New intSeries with value added.
* throws: Will throw an error if intSeries is an invalid format.

intSeriesOverlap(intSeries1: string, intSeries2: string): boolean {
* param: { string } intSeries1.
* param: { string } intSeries2.
* returns: {boolean} A boolean that reflects if any values of intSeries1 are in intSeries2.
* throws: Will throw an error if intSeries1 or intSeries2 is an invalid format.

intSeriesHas(intSeries: string, value: number): boolean {
* param: { string } intSeries.
* param: {number} value: Value to search for in intSeries.
* returns: {boolean} Result of searching for value in intSeries.
* throws: Will throw an error if intSeries is an invalid format.

## License: ISC
