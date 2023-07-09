import { Serie } from "./Serie";
import type { Weight } from "./Weight";

/** A serie of an exercice within a workout. Add the GUI properties and those calculable dynamically. */
export class SerieGUI extends Serie {

    constructor(r: number, rn: number, w: Weight,
        /** Indicate if the collapse element is open or close. */
        public isOpen: boolean = false) {
        super(r, rn, w);
    }
}