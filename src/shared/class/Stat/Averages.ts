import { buildAverageActivityList } from "../../functions/Activity";
import type { Activity } from "../Activity/Activity";

export class AveragesData {
  public averageActivityList: Activity[];
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

  build(ActivityList: Activity[], nbDays: number) {
		console.log(ActivityList, nbDays);

    this.averageActivityList = buildAverageActivityList(ActivityList, nbDays);

		if (this.averageActivityList.length < 1) return;

		this.averageCalories = this.averageActivityList[0].calories;
		this.averageWeight = this.averageActivityList[0].weight;
		this.averageSteps = this.averageActivityList[0].steps;

		this.totalAverageWeightLoss = this.averageActivityList[nbDays - 1].weight - this.averageActivityList[0].weight;
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


