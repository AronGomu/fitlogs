<script lang="ts">
	import { settings } from "../../shared/store/settingsStore";
	import type { Activity } from "../../shared/class/Activity/Activity";
	import type { Settings } from "../../shared/class/Settings";

	let si: Settings;
	settings.subscribe((s) => (si = s));

	export let activities: Activity[] = null;

	// parameters

	let nbDays: number = 15;
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
	let averageCaloriesBurned: number;
	let averageWeightLoss: number;

	type AverageProperty = "calories" | "weight" | "steps";

	init();

	function init() {
		setNbDays(nbDays);
	}

	function calculateValues() {
		averageCalories = Math.trunc(getAverage("calories", 0));
		averageWeight = Number(getAverage("weight", 0).toFixed(1));
		averageSteps = Math.trunc(getAverage("steps", 0));
		averageWeightLoss = Number(getAverageWeightLoss().toFixed(1));
		console.log(averageWeightLoss);
		averageCaloriesBurned =
			convertWeightIntoCalories(averageWeightLoss);
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

	function getAverage(
		propertyName: AverageProperty,
		nbDaysBefore: number,
	): number {
		if (!activities || activities.length < 1) return 0;

		let total: number = 0;
		let nbElements: number = 0;

		let startingDay = 0 + nbDaysBefore;
		let len = nbDays;

		if (startingDay > activities.length) return 0;
		if (len > activities.length) len = activities.length;

		for (let i = startingDay; i < len; i++) {
			const a = activities[i];
			if (!a) continue;
			if (!a[propertyName]) continue;

			total += a[propertyName];
			nbElements += 1;
		}

		return total / nbElements;
	}

	function getAverageWeightLoss(): number {
		const nbDaysAverageWeight = getAverage("weight", nbDays);
		if (nbDaysAverageWeight == 0) return 0;
		const todayAverageWeight = getAverage("weight", 0);
		return nbDaysAverageWeight - todayAverageWeight;
	}

	function convertWeightIntoCalories(weight: number): number {
		return weight * 7700;
	}
</script>

<div class="h-full w-full">
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

	{#if nbDays}
		<div class="w-full flex items-center justify-center mb-8">
			<span class="text-3xl text-secondary"
				>Averages on Last {nbDays} Days</span
			>
		</div>
	{/if}

	{#if averageWeight}
		<div class="w-full flex justify-center">
			<span class="text-6xl text-accent ml-4">
				{averageWeight}</span
			>
			<span class="text-xl text-neutral-content mt-auto">
				{si.wm.toLowerCase()}</span
			>
		</div>
	{/if}

	{#if averageCalories}
		<div class="w-full flex items-center justify-center">
			<span class="text-6xl text-accent ml-4">
				{averageCalories}</span
			><span class="text-xl text-neutral-content mt-auto">
				cals eaten</span
			>
		</div>
	{/if}

	{#if averageSteps}
		<div class="w-full flex items-center justify-center">
			<span class="text-6xl text-accent ml-4">
				{averageSteps}</span
			><span class="text-xl text-neutral-content mt-auto">
				steps</span
			>
		</div>
	{/if}

	{#if averageCaloriesBurned && averageWeightLoss}
		<div class="w-full flex items-center justify-left">
			<span class="text-2xl text-neutral-content"
				>Weight Progression :</span
			>
			<span class="text-6xl text-accent ml-4">
				{averageCaloriesBurned}
			</span>
			<span class="text-xl text-accent">cal</span>
			<span class="text-6xl text-accent ml-4">
				/ {averageWeightLoss}
			</span>
			<span class="text-xl text-accent">{si.wm}</span>
		</div>
	{/if}

	{#if !activities}
		<div class="h-full w-full flex items-center justify-center">
			<span class="text-error"
				>You have no Activity on the last {nbDays} days</span
			>
		</div>
	{/if}
</div>
