import { WeightMetric } from "../../enum/WeightMetrics";

export class Weight {
	constructor(public weight: number, public metric: WeightMetric) {}

	/** Return the weight in kilos. */
	getWeightInKilos(): number {
		switch (this.metric) {
			case WeightMetric.Pounds:
				return this.weight * 2.205;
			default:
				return this.weight;
		}
	}

	/** Return the weight in pounds. */
	getWeightInPounds(): number {
		switch (this.metric) {
			case WeightMetric.Kilos:
				return this.weight / 2.205;
			default:
				return this.weight;
		}
	}

	getWeightByMetric(metric: WeightMetric): number {
		switch (metric) {
			case WeightMetric.Kilos:
				return this.getWeightInKilos();
			case WeightMetric.Pounds:
				return this.getWeightInPounds();

			default:
				throw new Error(
					`From getWeightByMetric : "${metric}" is not a valid metric`
				);
		}
	}
}

export function getRealWeigth(w: Weight) {
	return new Weight(w.weight, w.metric);
}
