<script lang="ts">
	import { Plan } from "../../shared/class/Plan/Plan";
	import {
		getAllPlansFromDatabase,
		getCurrentPlanFromDatabase,
		putPlanInDatabase,
	} from "../../shared/functions/database/plan";
	import AutoCompleteInput from "../WorkoutForm/inputs/AutoCompleteInput.svelte";
	import InputNumber from "../WorkoutForm/inputs/InputNumber.svelte";

	let cp: Plan;
	let plans: Plan[];

	let isPlanValid: boolean = false;

	init();

	function init(): void {
		setPlans();
	}

	function setPlans(): void {
		fetchCurrentPlan();
		fetchAllPlansFromDatabase();
	}

	async function fetchCurrentPlan() {
		cp = await getCurrentPlanFromDatabase();
		console.log(cp);
		if (!cp) {
			cp = new Plan(null, null, null, null, null);
		}
	}

	async function fetchAllPlansFromDatabase() {
		plans = await getAllPlansFromDatabase();
		console.log(plans);
	}

	async function savePlan(): Promise<void> {
		await putPlanInDatabase(cp);
		setPlans();
	}

	function setAsCurrent() {}

	function checkIfPlanIsValid(): void {
		if (!cp.name) {
			isPlanValid = false;
		} else {
			isPlanValid = true;
		}
	}
</script>

<div class="flex flex-col items-center">
	{#if cp}
		<input
			class="input input-bordered"
			bind:value={cp.name}
			placeholder="Plan's name"
			on:input={() => checkIfPlanIsValid()}
		/>

		<InputNumber
			label="Average Calories Target"
			placeholder="How many calories per day on average ?"
			className="input w-full mr-0 text-left"
			value={cp.targetWeeklyAverageCalories}
			on:input={(event) => {
				cp.targetWeeklyAverageCalories =
					event.detail.value;
			}}
		/>

		<InputNumber
			label="Average Steps Target"
			placeholder="How many steps per day on average ?"
			className="input w-full mr-0 text-left"
			value={cp.targetWeeklyAverageSteps}
			on:input={(event) => {
				cp.targetWeeklyAverageSteps =
					event.detail.value;
			}}
		/>

		{#if isPlanValid}
			<button
				class="btn btn-success"
				on:click={() => setAsCurrent()}
				>Set as Current</button
			>
			<button
				class="btn btn-success"
				on:click={() => savePlan()}>Save Plan</button
			>
		{:else}
			<button class="btn" disabled>Save Plan</button>
		{/if}
	{/if}

	{#if plans && plans.length > 1}
		<select class="select select-bordered w-full max-w-xs">
			{#each plans as p}
				{#if p.isCurrent}
					<option disabled selected
						>{p.name}</option
					>
				{:else}
					<option>{p.name}</option>
				{/if}
			{/each}
		</select>
	{/if}
</div>
