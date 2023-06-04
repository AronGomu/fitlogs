import { WeightMetrics } from "../enum/WeightMetrics";


export class Weight {
    constructor(public weight: number, public metric: WeightMetrics) {}

    /** Return the weight in kilos. */
    getWeightInKilos(): number {
        switch (this.metric) {
            case WeightMetrics.Pounds: return this.weight * 2.205;
            default: return this.weight;
        }
    }

    /** Return the weight in pounds. */
    getWeightInPounds(): number {
        switch (this.metric) {
            case WeightMetrics.Kilos: return this.weight / 2.205;
            default: return this.weight;
        }
    }

    getWeightByMetric(metric: WeightMetrics): number {
        switch (metric) {
            case WeightMetrics.Kilos: return this.getWeightInKilos();
            case WeightMetrics.Pounds: return this.getWeightInPounds();
        
            default: throw new Error(`From getWeightByMetric : "${metric}" is not a valid metric`);
            
        }
    }
}