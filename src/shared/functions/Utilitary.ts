import { WeightMetrics } from "../enum/WeightMetrics";

export function getReducedStringMetric(metric: WeightMetrics): string {
    switch (metric) {
        case WeightMetrics.Kilos: return "kgs";
        case WeightMetrics.Pounds: return "lbs";
    
        default: throw new Error(`From getWeightByMetric : "${metric}" is not a valid metric`);
    }
}