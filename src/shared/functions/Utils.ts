import type { Activity } from "../class/Activity/Activity";

/** Select the whole text from html element from html element event. */
export function selectWholeText(e) {
	e.target.select();
}

/** Creates an id for a HTML element combining the parent component key, the key and the index.
 * @param componentName Refers to the specific page, component or parent component. It needs to be unique in the whole app so that modification apply only to element of this specific component.
 * @param divId Refers to a unique id among the different type of element within the component.
 * @param i Index of the element if part of a list
 */
export function createElementId(
	componentName: string,
	divId: string,
	i: number
) {
	return `${componentName}-${divId}-${i}`;
}

/** Dispatch event on click outside of node */
export function clickOutside(node) {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent("click_outside", node));
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
}

/**
 * Formats a date with the month spelled out based on the country formatting.
 * @param date - The date object to format.
 * @returns A string representing the formatted date.
 */
export function formatDateWithSpelledOutMonth(date: Date): string {
	// Options for date formatting
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	// Format the date using the user's locale
	return date.toLocaleDateString(undefined, options);
}

/** Set all the properties of an object to a new object. */
export function setObjectFromObject<T>(oldO: T, newO: T): T {
	for (const key of Object.keys(oldO)) {
		newO[key] = oldO[key];
	}

	return newO;
}

/**
 * Get the name of the class for an object.
 * @param obj - The object for which to get the class name.
 * @returns The name of the class for the given object.
 */
export function getClassName(obj: any): string {
	// Use the constructor property to get the class
	const className = obj.constructor.name;
	return className;
}

/**
 * Parse a string into an object of the specified class.
 * @param jsonString - The JSON string to parse.
 * @param targetClass - The class of the target object.
 * @returns An instance of the target class with properties assigned based on the parsed JSON.
 */
export function parseJsonToObject<T>(
	jsonString: string,
	targetClass: new () => T
): T {
	// Parse the JSON string into a JavaScript object
	const parsedObject = JSON.parse(jsonString);

	// Create a new instance of the target class
	const targetObject = new targetClass();

	// Assign properties from the parsed object to the target object
	for (const property in parsedObject) {
		if (parsedObject.hasOwnProperty(property)) {
			targetObject[property] = parsedObject[property];
		}
	}

	return targetObject;
}

/**
 * Parse a JSON array into an array of objects of the specified class.
 * @param jsonArrayString - The JSON array string to parse.
 * @param targetClass - The class of the target objects.
 * @returns An array of instances of the target class with properties assigned based on the parsed JSON.
 */
export function parseJsonArrayToObjectArray<T>(
	jsonArrayString: string,
	targetClass: new () => T
): T[] {
	// Parse the JSON array string into a JavaScript array
	const parsedArray = JSON.parse(jsonArrayString);

	// Create an empty array to store the target objects
	const targetArray: T[] = [];

	// Iterate over each item in the parsed array
	for (const item of parsedArray) {
		// Create a new instance of the target class
		const targetObject = new targetClass();

		// Assign properties from the parsed object to the target object
		for (const property in item) {
			if (item.hasOwnProperty(property)) {
				targetObject[property] = item[property];
			}
		}

		// Add the target object to the array
		targetArray.push(targetObject);
	}

	return targetArray;
}

/**
 * Removes duplicate strings and empty strings from a given string list.
 * @param list - The string list containing duplicates and empty strings.
 * @returns A new string list without duplicates and empty strings.
 */
export function removeDuplicates(list: string[]): string[] {
	// Create a new Set to store unique strings
	const uniqueSet = new Set<string>();

	// Iterate over the input list
	for (const item of list) {
		// Add each non-empty string to the Set (Set only stores unique values)
		if (item.trim() !== "") {
			uniqueSet.add(item);
		}
	}

	// Convert the Set back to an array of strings
	const uniqueList = Array.from(uniqueSet);

	return uniqueList;
}

/**
 * Downloads the provided data as a JSON file.
 * @param data - The data to be downloaded as JSON.
 * @param filename - The filename for the downloaded file (without extension).
 */
export function downloadAsJson(data: object | object[], filename: string) {
	const json = JSON.stringify(data);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = `${filename}.json`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	URL.revokeObjectURL(url);
}

// CONVERT OBJECTS INTO OTHER OR SUBSETS

/**
 * Returns the last element from an array.
 * @param array - The input array.
 * @returns The last element of the array, or `undefined` if the array is empty.
 */
export function last<T>(array: T[]): T | undefined {
	if (array.length === 0) {
		return undefined;
	}
	return array[array.length - 1];
}

/**
 * Converts an enum object into a list of strings containing the values of the enum.
 * @param enumObject - The enum object.
 * @param nullString - String showed for the null value.
 * @returns An array of strings with the values of the enum.
 */
export function enumToList<T extends Record<string, string | number>>(
	enumObject: T
): string[] {
	return Object.values(enumObject) as string[];
}

/**
 * Converts an enum object into a list of all the enums.
 * @param enumObject - The enum object.
 * @param nullString - String showed for the null value.
 * @returns An array of strings with the values of the enum.
 */
export function getAllEnums<T extends Record<string, string | number>>(
	enumObject: T
): T[] {
	var enums: T[] = [];
	for (const e of Object.values(enumObject) as string[]) {
		this.muscles.push(enums[e]);
	}
	return enums;
}

// Condition functions

/**
 * Checks if a number is negative.
 * @param num - The number to check.
 * @returns {boolean} - `true` if the number is negative, `false` otherwise.
 */
export function isNegative(num: number) {
	return num < 0;
}

/**
 * Check if the given argument is a positive number.
 * @param num - The number to be checked.
 * @returns {boolean} - True if the number is positive, false otherwise.
 */
export function isPositive(num: number): boolean {
	// Check if the number is positive
	return num > 0;
}

/**
 * Checks if a number is postive and above 0.
 * @param num - The number to check.
 * @returns {boolean} - `true` if the number is positive, above 0, `false` otherwise.
 */
export function isPositiveNonZero(num: number) {
	return num > 0;
}

/**
 * Checks if a string is not null and not empty.
 * @param str - The string to check.
 * @returns `true` if the string is not null and not empty, otherwise `false`.
 */
export function isStringNotEmpty(str: string | null | undefined): boolean {
	return str !== null && str !== undefined && str.trim() !== "";
}

/**
 * Checks if a value is an array and has at least one element.
 * @param value - The value to check.
 * @param nMin - Minimum number of elements.
 * @returns `true` if the value is an array with at least one element, otherwise `false`.
 */
export function isArrayWithElements(
	value: unknown,
	nMin: number = 1
): boolean {
	if (Array.isArray(value)) {
		return value.length >= nMin;
	}
	return false;
}

/** Compare the 2 objects values and properties.*/
export function compare(o1: any, o2: any): boolean {
	if (JSON.stringify(o1) == JSON.stringify(o2)) return true;
	return false;
}

export function truncateNumber(n: number, decimals: number): number {
	const s = n.toFixed(decimals)
	return Number(s);
}

export function getNbDaysLeftInWeek(d: Date) {
	const dayOfWeek = d.getDay();
	const daysInWeek = 7;
	return daysInWeek - dayOfWeek;
}


export function assert(condition: any, message: string) {
    if (!condition) throw new Error(message || "Assertion failed");
    
}

/** x (inclusive) and y (exclusive) | swap values if x is greater than y */
export function getRandomNumber(x, y) {
    if (x > y) [x, y] = [y, x];
    const rn = Math.random() * (y - x) + x;
	return truncateNumber(rn, 0);
}

export function generateRandomWeight(startingWeight: number, n: number, maxInterval: number) {
	const weights: number[] = [];
	for (let i = 0; i < n; i++) {


	}
}

export /**
 * Returns the number of days in a given month of a specified year.
 *
 * @param year - The year for which to determine the number of days in the month.
 * @param month - The month (1-12) for which to determine the number of days.
 *                Note: January is 1 and December is 12.
 * @returns The number of days in the specified month of the specified year.
 * @throws Error if the month is not between 1 and 12.
 */
function getDaysInMonth(year: number, month: number): number {
    // Validate month input
    if (month < 1 || month > 12) {
        throw new Error('Month must be between 1 and 12.');
    }

    // Create a Date object for the first day of the next month
    const date = new Date(year, month, 0); // 0 gives us the last day of the previous month

    // Return the date's day value which corresponds to the last day of the month
    return date.getDate();
}


export function sortActivityList(ActivityList): Activity[] {
	ActivityList.sort((a: Activity, b: Activity) => {
		if (!a && b) return -1;
		if (a && !b) return 1;
		if (!a && !b) return 0;
		return Number(a.date) - Number(b.date)
	});

	return ActivityList;
}

function convertWeightIntoCalories(weight: number): number {
	return weight * 7700;
}

/**
 * Returns true or false depending on the probability of false.
 * 
 * @param falseChance - The chance (0–100) in percent that the result will be false.
 * @returns boolean - true or false based on the given probability.
 */
export function randomBoolean(falseChance: number): boolean {
  if (falseChance < 0 || falseChance > 100) {
    throw new Error("falseChance must be between 0 and 100");
  }

  const roll = Math.random() * 100;
  return roll >= falseChance;
}




