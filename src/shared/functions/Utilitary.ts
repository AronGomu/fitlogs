import { WeightMetrics } from "../enum/WeightMetrics";

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