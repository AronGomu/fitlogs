import type { Muscle } from "../enum/Muscle";

/** Estimates the work of a muscle within an exercice. */
export class MuscleWork {
    constructor(
        /** Muscle that is worked on. */
        public muscle: Muscle,
        /** Pourcentage of the work. Must be an integer between 1 and 100. */
        public work: number,
    ) {}
}