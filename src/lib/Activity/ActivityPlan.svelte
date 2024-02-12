<script lang="ts">
	import InputNumber from "../WorkoutForm/inputs/InputNumber.svelte";

	let targetWeeklyAverageCalories: number;
	let targetWeeklyAverageSteps: number;

	init();

	function init(): void {
		getCurrentPlan();
		getAllPlans();
	}
</script>

<InputNumber
	label="Average Calories Target"
	placeholder="How many calories per day on average ?"
	className="input w-24 mr-0 text-left"
	value={targetWeeklyAverageCalories}
	on:input={(event) => {
		targetWeeklyAverageCalories = event.detail.value;
	}}
/>

<InputNumber
	label="Average Steps Target"
	placeholder="How many steps per day on average ?"
	className="input w-24 mr-0 text-left"
	value={targetWeeklyAverageSteps}
	on:input={(event) => {
		targetWeeklyAverageSteps = event.detail.value;
	}}
/>
