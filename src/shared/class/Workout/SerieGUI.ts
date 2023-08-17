import { Serie } from "./Serie";
import type { Weight } from "./Weight";

/** A serie of an exercice within a workout. Add the GUI properties and those calculable dynamically. */
export class SerieGUI extends Serie {

    constructor(s: Serie,
        /** Indicate if the collapse element is open or close. */
        public isOpen: boolean = true) {
        super(s.rank, s.rn, s.weigth);
    }

    /** Update the base properties of SerieGUI with a given Serie object. */
    updateExercice(s: Serie) {
        this.rank = s.rank;
        this.rn = s.rn;
        this.weigth = s.weigth;
    }

    /** Return a base Serie object instance from the data of this SerieGUI instance. */
    convertToSerie(): Serie {
        return new Serie(this.rank, this.rn, this.weigth);
    }
}