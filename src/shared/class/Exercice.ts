import type { WeightMetrics } from "../enum/WeightMetrics";
import type { Set } from "./Set";

export class Exercice {
    /** HTML Element related/binded to this object. Needs to be set after initialization. */
    public e: HTMLElement = null;

    constructor(
        /** Name of the exercice. */
        public name: string,
        /** List of set of the exercice. */
        public sets: Set[], 
        /** Boolean flag to know if the accordeon is opne or not. */
        public isOpen: boolean
    ) { }

    /** Return the maximal weight done in the sets of the exercice. */
    getMaxWeight(metric: WeightMetrics): number {
        /** Max Weight to return */
        let mw: number = null;
        for (const set of this.sets) {
            if (!mw) mw = set.weight.getWeightByMetric(metric);
            if (mw < set.weight.getWeightByMetric(metric)) mw = set.weight.getWeightByMetric(metric);
        }
        return mw;
    }

}