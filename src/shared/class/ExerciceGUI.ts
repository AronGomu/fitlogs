import type { WeightMetric } from "../enum/WeightMetrics";
import { Exercice } from "./Exercice";
import { Serie } from "./Serie";
import { SerieGUI } from "./SerieGUI";
import type { Weight } from "./Weight";

/** An exercice within a workout. Add the GUI properties and those calculable dynamically. */
export class ExerciceGUI extends Exercice {
    
    

    /** Sets list with GUI properties. */
    public slGUI: SerieGUI[] = []; 

    constructor(
        e: Exercice, 
        /** Boolean flag to know if the accordeon is open or not. */
        public isSelfOpen: boolean = true,
        /** Boolean flag to know if the extra inputs (optionnal ones) are showed or not. */
        public isExtraOpen: boolean = false
    ) {
        super(e.lift, e.sl, e.notes);
        if (e.sl) for (const s of e.sl) this.slGUI.push(new SerieGUI(s));
    }

    addSet(weightMetric: WeightMetric) {
        const lastWeight: Weight = this.getLastWeigth(weightMetric);
        const s: Serie = new Serie(this.sl.length, 0, lastWeight)
        this.sl.push(s);
        this.slGUI.push(new SerieGUI(s, true));
    }

    /** Update the base properties of Exercice with a given Exercice object. */
    updateExercice(e: Exercice) {
        this.lift = e.lift;
        this.sl = e.sl;
    }

    /** Return a base Exercice object instance from the data of this ExerciceGUI instance. */
    convertToExercice(): Exercice {
        return new Exercice(this.lift, this.sl, this.notes);
    }

}