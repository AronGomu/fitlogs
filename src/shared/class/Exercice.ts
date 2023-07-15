import type { WeightMetric } from "../enum/WeightMetrics";
import { isArrayWithElements, last } from "../functions/Utilitary";
import type { Serie } from "./Serie";
import { Weight } from "./Weight";

/** An exercice within a workout.  Contains only essential properties for minimizing space in save file. */
export class Exercice {

    constructor(
        /** Name of the exercice. */
        public name: string,
        /** List of set of the exercice. */
        public sl: Serie[],
        /** Additionnal notes that can be added about the exercice. */
        public notes: string,
    ) { }

    /** Return the maximal weight done in the sets of the exercice. */
    getMaxWeight(metric: WeightMetric): number {
        /** Max Weight to return */
        let mw: number = null;
        for (const set of this.sl) {
            if (!mw) mw = set.weigth.getWeightByMetric(metric);
            if (mw < set.weigth.getWeightByMetric(metric)) mw = set.weigth.getWeightByMetric(metric);
        }
        return mw;
    }

    /** Based on the name of the exercice. Look through the exercice history and fetch the most relevant weigth to set by default. */
    getLastWeigth(weightMetric: WeightMetric): Weight {
        // Initialize the weigth to 0 by default
        let lastWeight: Weight = new Weight(0, weightMetric);
        // Get the last weight used within the same exercice set lists
        if (isArrayWithElements(this.sl)) lastWeight.weight = last(this.sl).weigth.weight;

        return lastWeight;
    }
}