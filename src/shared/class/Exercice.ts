import { WeightMetrics } from '../enum/WeightMetrics';
import { ExerciceSet } from './ExerciceSet'

export class Exercice {
    constructor(
        /** Name of the exercice selected in the Exercice Menu. */
        public name: string, 
        /** List of sets of the exercice. */
        public sets: ExerciceSet[] = []
    ) {}

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