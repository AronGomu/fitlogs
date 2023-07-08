import type { WeightMetrics } from "../enum/WeightMetrics";
import type { Serie } from "./Serie";

export class Exercice {

    constructor(
        /** Name of the exercice. */
        public name: string,
        /** List of set of the exercice. */
        public sets: Serie[], 
        /** Boolean flag to know if the accordeon is open or not. */
        public isSelfOpen: boolean = false,
        /** Boolean flag to know if the menu for duplication and stuff is open. */
        public isMenuOpen: boolean = false
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