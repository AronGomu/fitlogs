import { ExerciceSet } from "./ExerciceSet";
import type { Weight } from "./Weight";

export class ExerciceSetAccordeon extends ExerciceSet {
    constructor(public repetitions: number, public weight: Weight,
        public isOpen: boolean) {
        super(repetitions, weight);
    }
}