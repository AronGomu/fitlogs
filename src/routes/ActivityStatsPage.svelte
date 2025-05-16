<script lang="ts">
  import ActivityRangeSelector from "../lib/Activity/ActivityRangeSelector.svelte";
  import StatLabel from "../lib/Activity/StatLabel.svelte";
  import type { Activity } from "../shared/class/Activity/Activity";
  import type { Setting } from "../shared/class/Settings";
  import { setAverageActivities } from "../shared/functions/Activity";
  import { truncateNumber } from "../shared/functions/Utilitary";
  import { settings } from "../shared/store/settingsStore";

	let si: Setting;
	settings.subscribe((s) => (si = s));

	export let activities: Activity[] = null;

	// parameters

	let nbDays: number | null = 7;
	const nbDaysChoice = {
		oneWeek: { label: "1 Week", value: 7, class: "" },
		twoWeeks: { label: "2 Weeks", value: 15, class: "" },
		oneMonth: { label: "1 Month", value: 30, class: "" },
		twoMonth: { label: "2 Month", value: 60, class: "" },
		threeMonth: { label: "3 Month", value: 90, class: "" },
		sixMonth: { label: "6 Month", value: 180, class: "" },
		oneYear: {label: "1 Year",value: 365, class: "" },
		twoYears: { label: "2 Year", value: 730, class: "" },
		threeYears: { label: "3 Year", value: 1045, class: "" },
		all: { label: "All", value: null, class: "" },
	};

	// info to show
	let averageCalories: number;
	let averageWeight: number;
	let averageSteps: number;
	let averageActivities: Activity[];
	let averageCaloriesBurned: number;
	let averageTDEE: number;

	let totalAverageCaloriesBurned: number;
	let totalAverageWeightLoss: number;
	let totalAverageSteps: number;

	init();

	function init() {
		setNbDays(nbDays);
	}

	function calculateValues() {
		averageActivities = setAverageActivities(activities, nbDays);

		if (averageActivities.length < 1) return;

		averageCalories = averageActivities[0].calories;
		averageWeight = averageActivities[0].weight;
		averageSteps = averageActivities[0].steps;

		totalAverageWeightLoss =
			averageActivities[nbDays - 1].weight -
			averageActivities[0].weight;
		totalAverageWeightLoss = Number(
			totalAverageWeightLoss.toFixed(1),
		);

		totalAverageCaloriesBurned = truncateNumber(
			convertWeightIntoCalories(totalAverageWeightLoss),
			0,
		);

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

	function getTotalAverageSteps(): number {
		let total = 0;
		for (let i = 0; i < averageActivities.length; i++) {
			const a = averageActivities[i];
			total += a.steps;
		}
		return total;
	}

	function setNbDays(nb: number): void {
		nbDays = nb;
		for (const key of Object.keys(nbDaysChoice)) {
			nbDaysChoice[key].class = "";
			if (nbDaysChoice[key].value == nb) {
				nbDaysChoice[key].class = "btn-primary";
			}
		}

		calculateValues();
	}

	// function getAverageWeightLoss(): number {
	// 	const nbDaysAverageWeight = getAverage("weight", nbDays);
	// 	console.log("averageCaloriesBurned", nbDaysAverageWeight);
	// 	if (nbDaysAverageWeight == 0) return 0;
	// 	const todayAverageWeight = getAverage("weight", 0);
	// 	return nbDaysAverageWeight - todayAverageWeight;
	// }

	function convertWeightIntoCalories(weight: number): number {
		return weight * 7700;
	}

	function determineWeightLossLabel(): string {
		if (!totalAverageWeightLoss) return "";
		if (totalAverageWeightLoss < 0) return "gained";
		if (totalAverageWeightLoss > 0) return "losed";
		else return "";
	}

	function test(e) {
		console.log(e);
	}
</script>

<div class="h-full w-full">
	<div class="flex flex-row overflow-x-auto content-center">
		<ActivityRangeSelector on:click={(e) => test(e)}/>
	</div>

	<div class="w-full flex flex-row items-center mt-6 mb-4">
		<span class="text-3xl text-secondary">Averages on Last {nbDays} Days</span>
	</div>

	<div class="w-full justify-left">
		<StatLabel data={String(averageWeight)} label={si.wm.toLowerCase()} />
		<StatLabel data={String(averageCalories)} label="cals eaten" />
		<StatLabel data={String(averageCaloriesBurned)} label="cals burned" />
		<StatLabel data={String(averageTDEE)} label="cals total / TDEE" />
		<StatLabel data={String(averageSteps)} label="steps" />
	</div>

	<div class="w-full flex items-center mt-12 mb-4">
		<span class="text-3xl text-secondary">Totals</span>
	</div>

	<div class="w-full justify-left">
		{#if totalAverageCaloriesBurned && totalAverageWeightLoss}
			<StatLabel data={String(totalAverageCaloriesBurned)} label="cals burned" />
			<StatLabel data={String(totalAverageWeightLoss)} label={determineWeightLossLabel()} />
			<StatLabel data={String(totalAverageSteps)} label="steps" />
		{/if}
	</div>

	<div class="w-full flex items-center justify-center mt-12 mb-4">
		<span class="text-3xl text-secondary">All the Averages</span>
	</div>

	{#if averageActivities}
		<div class="h-full flex flex-col overflow-hidden">
			<div class="flex-1">
				<table class="table">
					<!-- head -->
					<thead>
						<tr>
							<th>
								<span
									class="font-bold"
									>Date</span
								>
							</th>
							<th>
								<span
									class="font-bold"
									>Weight</span
								>
							</th>
							<th>
								<span
									class="font-bold"
									>Calories</span
								>
							</th>
							<th>
								<span
									class="font-bold"
									>Steps</span
								>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each averageActivities as a}
							<tr>
								<td
									>{a.year}-{a.month}-{a.day}</td
								>
								<td
									>{a.weight}</td
								>
								<td
									>{a.calories}</td
								>
								<td
									>{a.steps}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<!-- content here -->
	{/if}

	{#if !activities}
		<div class="h-full w-full flex items-center justify-center">
			<span class="text-error"
				>You have no Activity on the last {nbDays} days</span
			>
		</div>
	{/if}
</div>
