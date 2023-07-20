import { isStringNotEmpty } from "../functions/Utilitary";
import type { MuscleWork } from "./MuscleWork";

/** Exercice suggestions that pops out when filling out a auto complete form of the exercice name.  */
export class Lift {
    constructor(
        /** Id of the object in the database. */
        public id?: number,
        /** Name of the exercice. */
        public name?: string,
        /** Name of the variation of the lift (what is between parenthese). */
        public variation?: string,
        /** List of muscle targeted by the exercice with the estimated average percentage of work for each. */
        public targets: MuscleWork[] = [],

    ) { }

    /** Return true if they have the same id. False otherwise. */
    compareById(l: Lift): boolean {
        if (l.id === this.id) return true;
        return false;
    }

    /** Return the complete name of the exercice. */
    getExerciceName(): string {
        // in the case there is the variation specified
        if (isStringNotEmpty(this.variation)) {
            return `${this.name} (${this.variation})`
        }
        // default
        return this.name;
        
    }
}

export function getRealEs(l: Lift) {
    console.log(l);
    return new Lift(l.id, l.name, l.variation, l.targets);
}