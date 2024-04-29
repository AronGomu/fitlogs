import { getRealWeigth, type Weight } from "./Weight";

/** A serie of an exercice within a workout. */
export class Serie {
	constructor(
		// SERIE VARIABLES
		/** Rank of the set within the exercice. */
		public rank: number,
		/** Repetition number of repetitions dones. */
		public reps: number,
		/** Weight used in the set. */
		public weight: Weight,
	) { }
}

/** Take a Serie from the database and transform it into a class instance.*/
export function getRealSerie(s: Serie) {
	console.log(`getRealSerie`, s)
	return new Serie(s.rank, s.reps, getRealWeigth(s.weight));
}
