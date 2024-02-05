<script lang="ts">
	import { Activity } from "../../../shared/class/Activity/Activity";
	import type { Settings } from "../../../shared/class/Settings";
	import {
		getActivityFromDatabase,
		putActivityInDatabase,
		deleteActivityFromDatabase,
	} from "../../../shared/functions/Database";
	import { settings } from "../../../shared/store/settingsStore";
	import DateInput from "../../DateInput.svelte";
	import InputNumber from "../inputs/InputNumber.svelte";

	let si: Settings;
	settings.subscribe((s) => (si = s));

	// Activity form
	let date = new Date();
	let weight: number;
	let calories: number;
	let steps: number;

	// UI Stuff
	const todayDate = new Date();
	let doesActivityAlreadyExist: boolean = false;
	let isItToday = false;

	checkActivityExistence();
	checkIfIsItToday();

	function checkIfIsItToday(): void {
		console.log(date);
		console.log(todayDate);
		if (date.getFullYear() !== todayDate.getFullYear()) {
			isItToday = false;
			return;
		}
		if (date.getMonth() !== todayDate.getMonth()) {
			isItToday = false;
			return;
		}
		if (date.getDay() !== todayDate.getDay()) {
			isItToday = false;
			return;
		}
		isItToday = true;
	}

	async function checkActivityExistence() {
		const activity = await getActivityFromDatabase(
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate(),
		);
		console.log(activity);
		if (!activity) {
			doesActivityAlreadyExist = false;
			weight = null;
			calories = null;
			steps = null;
		} else {
			weight = activity.weight;
			calories = activity.calories;
			steps = activity.steps;
			doesActivityAlreadyExist = true;
		}
	}

	function formatDate(date: Date): string {
		return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
	}

	function saveActivity(): void {
		const activity = new Activity(
			date.getFullYear(),
			date.getMonth() + 1, // month start at zero in js
			date.getDate(),
			Number(weight),
			Number(calories),
			Number(steps),
		);
		putActivityInDatabase(activity);
		checkActivityExistence();
	}

	async function deleteActivity(): Promise<void> {
		const activity = await deleteActivityFromDatabase(
			Number(date.getFullYear()),
			Number(date.getMonth()),
			Number(date.getDay()),
		);
		checkActivityExistence();
		console.log(`deleteActivity`);
		console.log(activity);
	}
</script>

<div class="flex flex-col">
	<DateInput
		bind:date
		on:input={(event) => {
			checkActivityExistence();
			checkIfIsItToday();
		}}
	/>

	<InputNumber
		label="Weight"
		placeholder="Weight"
		className="input w-24 mr-0 text-left"
		initValue={weight}
		metric={si.wm}
		on:input={(event) => {
			weight = event.detail.value;
		}}
	/>

	<InputNumber
		label="Calories"
		placeholder="Calories"
		className="input w-24 mr-0 text-left"
		initValue={calories}
		on:input={(event) => {
			calories = event.detail.value;
		}}
	/>

	<InputNumber
		label="Steps"
		placeholder="Steps"
		className="input w-24 mr-0 text-left"
		initValue={steps}
		on:input={(event) => {
			steps = event.detail.value;
		}}
	/>
</div>

{#if doesActivityAlreadyExist}
	<button class="btn btn-warning" on:click={() => saveActivity()}
		>Update Activity</button
	>
	<button class="btn btn-error" on:click={() => deleteActivity()}
		>Delete Activity</button
	>
{:else if isItToday}
	<button class="btn btn-success" on:click={() => saveActivity()}
		>Log Today's Activity</button
	>
{:else}
	<button class="btn btn-warning" on:click={() => saveActivity()}
		>Log Activity</button
	>
{/if}
