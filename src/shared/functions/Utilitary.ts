import type { Workout } from "../class/Workout";
import { WeightMetrics } from "../enum/WeightMetrics";
import { saveWorkout } from "../store/saveStore";

export function getReducedStringMetric(metric: WeightMetrics): string {
    switch (metric) {
        case WeightMetrics.Kilos: return "kgs";
        case WeightMetrics.Pounds: return "lbs";
    
        default: throw new Error(`From getWeightByMetric : "${metric}" is not a valid metric`);
    }
}

/** When clicking on some characters of an text input, this will automatically select the whole text */
export function selectWholeTextOnFocus(e): void {
    e.target.select();
}

/** Creates an id for a HTML element combining the parent component key, the key and the index. 
 * @param componentName Refers to the specific page, component or parent component. It needs to be unique in the whole app so that modification apply only to element of this specific component.
 * @param divId Refers to a unique id among the different type of element within the component.
 * @param i Index of the element if part of a list
*/
export function createElementId(componentName: string, divId: string, i: number) {
    return `${componentName}-${divId}-${i}`;
}


/** Dispatch event on click outside of node */
export function clickOutside(node) {
  
    const handleClick = event => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('click_outside', node)
        )
      }
    }
  
      document.addEventListener('click', handleClick, true);
    
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
      }
  }


/**
 * Formats a date with the month spelled out based on the country formatting.
 * @param date - The date object to format.
 * @returns A string representing the formatted date.
 */
export function formatDateWithSpelledOutMonth(date: Date): string {
  // Options for date formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Format the date using the user's locale
  return date.toLocaleDateString(undefined, options);
}

/** Set all the properties of an object to a new object. */
export function setObjectFromObject<T>(oldO: T, newO: T): T {
  for (const key of Object.keys(oldO)) {
    newO[key] = oldO[key];
  }
  console.log(newO);
  
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
export function parseJsonToObject<T>(jsonString: string, targetClass: new () => T): T {
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
export function parseJsonArrayToObjectArray<T>(jsonArrayString: string, targetClass: new () => T): T[] {
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


/** Triggers whenever the user modify the name input of the Workout Form is modified. Update the Workout object and save it into the */
export function updateWorkoutProperty(value: any, property: any, workout: Workout) {
  console.log(property);
  console.log(JSON.stringify(workout));
  property = value;
  console.log(property);
  console.log(JSON.stringify(workout));
  saveWorkout(workout);
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
    if (item.trim() !== '') {
      uniqueSet.add(item);
    }
  }

  // Convert the Set back to an array of strings
  const uniqueList = Array.from(uniqueSet);

  return uniqueList;
}

