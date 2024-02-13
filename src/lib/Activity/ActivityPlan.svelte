<script lang="ts">
	import { Activity } from "../../shared/class/Activity/Activity";
	import { Plan } from "../../shared/class/Plan/Plan";
	import {
		getPlanFromDatabase,
		updatePlanInDatabase,
	} from "../../shared/functions/database/plan";
	import InputNumber from "../WorkoutForm/inputs/InputNumber.svelte";

	export let activities: Activity[];
	let plan: Plan;

	const today = new Date();
	const todayDay = today.getDay();
	const nbDaysLeftInWeek = 7 - todayDay;
	let totalCaloriesEaten: number;
	let totalStepsWalked: number;
	let totalCaloriesTodo: number;
	let totalStepsTodo: number;
	let averageCaloriesTodo: number;
	let averageStepsTodo: number;

	let isMissingDays: boolean = true;

	init();

	async function init() {
		await fetchPlan();
		calculateGoals();
	}

	async function fetchPlan() {
		plan = await getPlanFromDatabase();
		if (!plan) {
			plan = new Plan(null, null);
		}
	}

	function calculateGoals() {
		totalCaloriesEaten = 0;
		totalStepsWalked = 0;
		totalCaloriesTodo = 0;
		totalStepsTodo = 0;

		let totalCaloriesWeek = plan.targetWeeklyAverageCalories * 7;
		let totalStepsWeek = plan.targetWeeklyAverageSteps * 7;

		for (let i = 0; i < todayDay + 1; i++) {
			const a = activities[i];
			console.log(a);
			if (a && a.day === today.getDate()) continue;
			if (!isactivityValid(a)) {
				isMissingDays = true;
				return;
			}
			totalCaloriesEaten += a.calories;
			totalStepsWalked += a.steps;
		}

		for (let i = todayDay + 1; i < 7 + 1; i++) {
			totalCaloriesTodo += plan.targetWeeklyAverageCalories;
			totalStepsTodo += plan.targetWeeklyAverageSteps;
		}

		const totalCaloriesLeft =
			totalCaloriesWeek - totalCaloriesEaten;
		const totalStepsLeft = totalStepsWeek - totalStepsWalked;

		averageCaloriesTodo = totalCaloriesLeft / nbDaysLeftInWeek;
		averageStepsTodo = totalStepsLeft / nbDaysLeftInWeek;
		isMissingDays = false;
	}

	function isactivityValid(
		activity: Activity,
		nbDaysBefore: number,
	): boolean {
		const day = new Date(today.getDate() - nbDaysBefore);
		console.log(day);
		console.log(activity);
		console.log(activity.day, today.getDate());
		console.log(activity.month, today.getMonth() + 1);
		console.log(activity.year, today.getFullYear());
		if (!activity) return false;
		if (!activity.calories) return false;
		if (!activity.steps) return false;
		if (activity.day !== today.getDate() + 1) return false;
		if (activity.month !== today.getMonth()) return false;
		if (activity.year !== today.getFullYear()) return false;
		return true;
	}

	async function savePlan(): Promise<void> {
		await updatePlanInDatabase(plan);
		fetchPlan;
	}
</script>

<div class="flex flex-col items-center">
	{#if plan}
		<InputNumber
			label="Average Calories Target"
			placeholder="How many calories per day on average ?"
			className="input w-full mr-0 text-left"
			value={plan.targetWeeklyAverageCalories}
			on:input={(event) => {
				plan.targetWeeklyAverageCalories = Number(
					event.detail.value,
				);
				savePlan();
			}}
		/>

		<InputNumber
			label="Average Steps Target"
			placeholder="How many steps per day on average ?"
			className="input w-full mr-0 text-left"
			value={plan.targetWeeklyAverageSteps}
			on:input={(event) => {
				plan.targetWeeklyAverageSteps = Number(
					event.detail.value,
				);
				savePlan();
			}}
		/>
	{/if}

	{#if isMissingDays}
		<div class="flex flex-col items-center">
			<div class="text-xl text-error">
				Some days in the week are not complete.
			</div>
			<div class="text-sm text-warning">
				Even if you don't have the exact data, it's
				better to estime it yourself than have nothing
			</div>
		</div>
	{:else if averageCaloriesTodo && averageStepsTodo}
		{averageCaloriesTodo}
		{averageStepsTodo}
	{/if}
</div>
