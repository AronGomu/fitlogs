import type { Weight } from "./Weight";

export class Set {
    /** HTML Element related/binded to this object. Needs to be set after initialization. */
    public e: HTMLElement = null;

    constructor(
        /** Number of repetitions dones */
        public repetitions: number,
        /** Weight used in the set. */
        public weight: Weight,

        /** Indicate if the collapse element is open or close. */
        public isOpen: boolean,
        ) {}
}