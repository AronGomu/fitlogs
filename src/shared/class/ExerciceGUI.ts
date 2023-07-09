import type { WeightMetrics } from "../enum/WeightMetrics";
import { Exercice } from "./Exercice";
import type { Serie } from "./Serie";
import { SerieGUI } from "./SerieGUI";

/** An exercice within a workout. Add the GUI properties and those calculable dynamically. */
export class ExerciceGUI extends Exercice {
    
    /** Boolean flag to know if the menu for duplication and stuff is open. */
    public isMenuOpen: boolean = false;

    /** Sets list with GUI properties. */
    public slGUI: SerieGUI[] = []; 

    constructor(n: string, sl: Serie[], 
        /** Boolean flag to know if the accordeon is open or not. */
        public isSelfOpen: boolean = false) {
        super(n, sl);
        for (const s of sl) this.slGUI.push(new SerieGUI(s.r, s.rn, s.w));
    }

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