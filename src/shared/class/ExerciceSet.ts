import type { Weight } from "./Weight";

export class ExerciceSet {
    constructor(
        /** Number of repetition on this set. */
        public repetitions: number,
        /** Weight used for the set.*/
        public weight: Weight) {}
}