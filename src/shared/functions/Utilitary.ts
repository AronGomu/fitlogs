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