import type { Weight } from "./Weight";

export class Serie {
    /** HTML Element related/binded to this object. Needs to be set after initialization. */
    public mainDiv: HTMLElement = null;
    /** HTML Element related/binded to the superimposed div showing the red background and delete icon on touch animation. */
    public deleteDiv: HTMLElement = null;

    constructor(
        /** Order of the set within the exercice. */
        public id: number,
        /** Number of repetitions dones. */
        public repetitions: number,
        /** Weight used in the set. */
        public weight: Weight,

        /** Indicate if the collapse element is open or close. */
        public isOpen: boolean,
        ) {}
}