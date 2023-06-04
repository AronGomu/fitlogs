import { Exercice } from "./Exercice";
import { ExerciceSet } from "./ExerciceSet";

export class ExerciceAccordeon extends Exercice {
    constructor(public name:string, public sets: ExerciceSet[], 
        /** Boolean flag to know if the accordeon is opne or not. */
        public isOpen: boolean) {
        super(name,sets);
    }

    getExercice(): Exercice {
        return new Exercice(this.name, this.sets);
    }
}