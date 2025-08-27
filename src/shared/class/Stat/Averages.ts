import { buildAverageActivityList } from "../../functions/Activity";
import type { Activity } from "../Activity/Activity";

export class AveragesData {
  public averageActivities: Activity[];
	public averageCaloriesBurned: number;
	public averageTDEE: number;

  public totalAverageCaloriesBurned: number;
	public totalAverageWeightLoss: number;
	public totalAverageSteps: number;

  constructor(
    public averageCalories: number,
	  public averageWeight: number,
	  public averageSteps: number,
  ) {

  }

  build(activities: Activity[], nbDays: number) {
		console.log(activities, nbDays);

    this.averageActivities = buildAverageActivityList(activities, nbDays);

		if (this.averageActivities.length < 1) return;

		this.averageCalories = this.averageActivities[0].calories;
		this.averageWeight = this.averageActivities[0].weight;
		this.averageSteps = this.averageActivities[0].steps;

		this.totalAverageWeightLoss = this.averageActivities[nbDays - 1].weight - this.averageActivities[0].weight;
		this.totalAverageWeightLoss = Number(this.totalAverageWeightLoss.toFixed(1));

		totalAverageCaloriesBurned = truncateNumber(convertWeightIntoCalories(this.totalAverageWeightLoss), 0);

		totalAverageSteps = truncateNumber(getTotalAverageSteps(), 0);

		averageCaloriesBurned = truncateNumber(
			totalAverageCaloriesBurned / nbDays,
			0,
		);

		averageTDEE = truncateNumber(
			averageCalories + averageCaloriesBurned,
			0,
		);
	}
}


