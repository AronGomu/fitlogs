import type { Weight } from "./Weight";

/** A serie of an exercice within a workout. Contains only essential properties for minimizing space in save file. */
export class Serie {
    constructor(
        /** Rank of the set within the exercice. */
        public r: number,
        /** Repetition number of repetitions dones. */
        public rn: number,
        /** Weight used in the set. */
        public w: Weight,
    ) {}
}