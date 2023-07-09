import type { WeightMetrics } from "../enum/WeightMetrics";
import type { Serie } from "./Serie";

/** An exercice within a workout.  Contains only essential properties for minimizing space in save file. */
export class Exercice {

    constructor(
        /** Name of the exercice. */
        public n: string,
        /** List of set of the exercice. */
        public sl: Serie[], 
        /** Boolean flag to know if the accordeon is open or not. */
        public isSelfOpen: boolean = false
    ) { }

    /** Return the maximal weight done in the sets of the exercice. */
    getMaxWeight(metric: WeightMetrics): number {
        /** Max Weight to return */
        let mw: number = null;
        for (const set of this.sl) {
            if (!mw) mw = set.w.getWeightByMetric(metric);
            if (mw < set.w.getWeightByMetric(metric)) mw = set.w.getWeightByMetric(metric);
        }
        return mw;
    }

}