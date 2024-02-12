<script lang="ts">
	import { settings } from "../../shared/store/settingsStore";
	import { Activity } from "../../shared/class/Activity/Activity";
	import type { Settings } from "../../shared/class/Settings";
	import { truncateNumber } from "../../shared/functions/Utilitary";

	let si: Settings;
	settings.subscribe((s) => (si = s));

	export let activities: Activity[] = null;

	// parameters

	let nbDays: number = 7;
	const nbDaysChoice = {
		one: {
			label: "1 Week",
			value: 7,
			class: "",
		},
		two: {
			label: "2 Weeks",
			value: 15,
			class: "",
		},
		three: {
			label: "1 Month",
			value: 30,
			class: "",
		},
		four: {
			label: "2 Month",
			value: 60,
			class: "",
		},
		five: {
			label: "3 Month",
			value: 90,
			class: "",
		},
		six: {
			label: "6 Month",
			value: 180,
			class: "",
		},
		seven: {
			label: "1 Year",
			value: 365,
			class: "",
		},
		eight: {
			label: "2 Year",
			value: 730,
			class: "",
		},
		nine: {
			label: "3 Year",
			value: 1045,
			class: "",
		},
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
		averageActivities = setAverageActivities(nbDays);

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
</script>

<div class="h-full w-full">
	<div class="flex flex-row overflow-x-auto">
		<button
			class="btn {nbDaysChoice.one.class}"
			on:click={() => setNbDays(nbDaysChoice.one.value)}
			>{nbDaysChoice.one.label}</button
		>
		<button
			class="btn {nbDaysChoice.two.class}"
			on:click={() => setNbDays(nbDaysChoice.two.value)}
			>{nbDaysChoice.two.label}</button
		>
		<button
			class="btn {nbDaysChoice.three.class}"
			on:click={() => setNbDays(nbDaysChoice.three.value)}
			>{nbDaysChoice.three.label}</button
		>
		<button
			class="btn {nbDaysChoice.four.class}"
			on:click={() => setNbDays(nbDaysChoice.four.value)}
			>{nbDaysChoice.four.label}</button
		>
		<button
			class="btn {nbDaysChoice.five.class}"
			on:click={() => setNbDays(nbDaysChoice.five.value)}
			>{nbDaysChoice.five.label}</button
		>
		<button
			class="btn {nbDaysChoice.six.class}"
			on:click={() => setNbDays(nbDaysChoice.six.value)}
			>{nbDaysChoice.six.label}</button
		>
		<button
			class="btn {nbDaysChoice.seven.class}"
			on:click={() => setNbDays(nbDaysChoice.seven.value)}
			>{nbDaysChoice.seven.label}</button
		>
		<button
			class="btn {nbDaysChoice.eight.class}"
			on:click={() => setNbDays(nbDaysChoice.eight.value)}
			>{nbDaysChoice.eight.label}</button
		>
		<button
			class="btn {nbDaysChoice.nine.class}"
			on:click={() => setNbDays(nbDaysChoice.nine.value)}
			>{nbDaysChoice.nine.label}</button
		>
	</div>

	<div class="w-full flex items-center justify-center mt-6 mb-4">
		<span class="text-3xl text-secondary"
			>Averages on Last {nbDays} Days</span
		>
	</div>

	{#if averageWeight}
		<div class="w-full flex justify-left">
			<span class="text-6xl text-accent ml-4">
				{averageWeight}</span
			>
			<span class="text-xl text-neutral-content mt-auto">
				{si.wm.toLowerCase()}</span
			>
		</div>
	{/if}

	{#if averageCalories}
		<div class="w-full flex items-center justify-left">
			<span class="text-6xl text-accent ml-4">
				{averageCalories}</span
			><span class="text-xl text-neutral-content mt-auto">
				cals eaten</span
			>
		</div>
	{/if}

	{#if averageCaloriesBurned}
		<div class="w-full flex items-center justify-left">
			<span class="text-6xl text-accent ml-4">
				{averageCaloriesBurned}</span
			><span class="text-xl text-neutral-content mt-auto">
				cals burned</span
			>
		</div>
	{/if}

	{#if averageTDEE}
		<div class="w-full flex items-center justify-left">
			<!-- <span class="text-6xl text-neutral-content ml-4"> -->
			<!-- 	TDEE : -->
			<!-- </span> -->
			<span class="text-6xl text-accent ml-4">
				{averageTDEE}</span
			>
			<span class="text-xl text-neutral-content mt-auto">
				cals total / TDEE</span
			>
		</div>
	{/if}

	{#if averageSteps}
		<div class="w-full flex items-center justify-left">
			<span class="text-6xl text-accent ml-4">
				{averageSteps}</span
			><span class="text-xl text-neutral-content mt-auto">
				steps</span
			>
		</div>
	{/if}

	<div class="w-full flex items-center justify-center mt-12 mb-4">
		<span class="text-3xl text-secondary">Totals</span>
	</div>

	{#if totalAverageCaloriesBurned && totalAverageWeightLoss}
		<div class="w-full flex flex-col justify-left">
			<div>
				<span class="text-6xl text-accent ml-4">
					{totalAverageCaloriesBurned}
				</span>
				<span
					class="text-xl text-neutral-content mt-auto"
				>
					cals burned</span
				>
			</div>

			<div>
				<span class="text-6xl text-accent ml-4">
					{totalAverageWeightLoss}
				</span>
				<span
					class="text-xl text-neutral-content mt-auto"
				>
					kilo
					{#if totalAverageWeightLoss < 0}
						gained
					{:else if totalAverageWeightLoss > 0}
						losed
					{/if}
				</span>
			</div>

			<div>
				<span class="text-6xl text-accent ml-4">
					{totalAverageSteps}
				</span>
				<span
					class="text-xl text-neutral-content mt-auto"
				>
					steps
				</span>
			</div>
		</div>
	{/if}

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
