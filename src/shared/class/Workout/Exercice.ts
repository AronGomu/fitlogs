import type { WeightMetric } from "../../enum/WeightMetrics";
import { isArrayWithElements, last } from "../../functions/Utilitary";
import { getRealLift, type Lift } from "../Lift/Lift";
import { RepRange, getRealRepRange } from "../Program/RepRange";
import { getRealSerie, type Serie } from "./Serie";
import { Weight } from "./Weight";

/** An exercice within a workout.  Contains only essential properties for minimizing space in save file. */
export class Exercice {
	constructor(
		/** Lift of the exercice. */
		public lift: Lift,
		/** List of series of the exercice. These are the actual value inputed during the workout. */
		public series: Serie[],
		/** Additionnal notes that can be added about the exercice. */
		public notes: string,

		// Data specific to the program
		/** Range of the number of repetitions that should be done during the sets. */
		public repRange: RepRange
	) {}

	/** Return the maximal weight done in the sets of the exercice. */
	getMaxWeight(metric: WeightMetric): number {
		/** Max Weight to return */
		let mw: number = null;
		for (const set of this.series) {
			if (!mw) mw = set.weigth.getWeightByMetric(metric);
			if (mw < set.weigth.getWeightByMetric(metric))
				mw = set.weigth.getWeightByMetric(metric);
		}
		return mw;
	}

	/** Based on the name of the exercice. Look through the exercice history and fetch the most relevant weigth to set by default. */
	getLastWeigth(weightMetric: WeightMetric): Weight {
		// Initialize the weigth to 0 by default
		let lastWeight: Weight = new Weight(0, weightMetric);
		// Get the last weight used within the same exercice set lists
		if (isArrayWithElements(this.series))
			lastWeight.weight = last(this.series).weigth.weight;

		return lastWeight;
	}
}

export function getRealExercice(e: Exercice) {
	let realSeries: Serie[] = [];
	for (const s of e.series) {
		realSeries.push(getRealSerie(s));
	}
	return new Exercice(
		getRealLift(e.lift),
		realSeries,
		e.notes,
		getRealRepRange(e.repRange)
	);
}
