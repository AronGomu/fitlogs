<script lang="ts">
  import InputNumber from "../lib/WorkoutForm/inputs/InputNumber.svelte";
  import type { Activity } from "../shared/class/Activity/Activity";
  import { Plan } from "../shared/class/Plan/Plan";
  import { getPlanFromDatabase, updatePlanInDatabase } from "../shared/functions/database/plan";
  import { truncateNumber } from "../shared/functions/Utilitary";



	export let ActivityList: Activity[];
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
		fetchPlan();
	}

	async function fetchPlan() {
		plan = await getPlanFromDatabase();
		if (!plan) {
			plan = new Plan(null, null);
		}
		calculateGoals();
	}

	function calculateGoals() {
		totalCaloriesEaten = 0;
		totalStepsWalked = 0;
		totalCaloriesTodo = 0;
		totalStepsTodo = 0;

		let totalCaloriesWeek = plan.targetWeeklyAverageCalories * 7;
		let totalStepsWeek = plan.targetWeeklyAverageSteps * 7;

		for (let i = 0; i < todayDay + 1; i++) {
			const a = ActivityList[i];

			// skip today
			if (a && a.day === today.getDate()) continue;

			if (!isactivityValid(a, i)) {
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

		averageCaloriesTodo = truncateNumber(
			totalCaloriesLeft / nbDaysLeftInWeek,
			0,
		);
		averageStepsTodo = truncateNumber(
			totalStepsLeft / nbDaysLeftInWeek,
			0,
		);
		isMissingDays = false;
	}

	function isactivityValid(
		activity: Activity,
		nbDaysBefore: number,
	): boolean {
		let day = new Date();
		day = new Date(day.setDate(day.getDate() - nbDaysBefore));
		if (!activity) return false;
		if (!activity.calories) return false;
		if (!activity.steps) return false;
		if (activity.day !== day.getDate()) return false;
		if (activity.month !== day.getMonth() + 1) return false;
		if (activity.year !== day.getFullYear()) return false;
		return true;
	}

	async function savePlan(): Promise<void> {
		const updatedPlan = await updatePlanInDatabase(plan);
		fetchPlan();
	}
</script>

<div class="flex flex-col items-center">
	<div class="w-full flex flex-col items-center justify-center mt-2 mb-6">
		<span class="text-5xl text-primary">Weekly Plan</span>
		<span class="text-xl text-secondary">Sunday to Saturday</span>
	</div>
	{#if plan}
		<InputNumber
			label="Average Calories Target"
			placeholder="How many calories per day on average ?"
			className="input input-bordered w-full mr-0 text-left"
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
			className="input input-bordered w-full mr-0 text-left"
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
			<div class="text-xl text-error text-center">
				Some days in the week are not complete.
			</div>
			<div class="text-sm text-warning text-center">
				Even if you don't have the exact data, it's
				better to estimate if you want to see some numbers
			</div>
		</div>
	{:else if averageCaloriesTodo && averageStepsTodo}
		<div class="w-full flex items-center justify-center mt-12 mb-4">
			<span class="text-3xl text-secondary"
				>Daily objectives :</span
			>
		</div>
		<div></div>
		<span class="text-6xl text-accent ml-4">
			{averageCaloriesTodo}
		</span>
		<span class="text-xl text-neutral-content mt-auto"> cals</span>
		<span class="text-6xl text-accent ml-4">
			{averageStepsTodo}
		</span>
		<span class="text-xl text-neutral-content mt-auto"> steps</span>
	{/if}
</div>
