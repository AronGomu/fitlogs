<script lang="ts">
	import type { Activity } from "../../shared/class/Activity/Activity";
	import ActivityForm from "./ActivityForm.svelte";
	import { ActivityDate } from "../../shared/class/Activity/ActivityDate";
	import { createEventDispatcher } from "svelte";

	// PARAMETERS
	export let last30: Activity[] = null;
	export let all: Activity[] = null;

	let showed: Activity[] = [];


	// GLOBAL VARIABLES
	const dispatch = createEventDispatcher();

	let todayYear, todayMonth, todayDay;
	let yesterdayYear, yesterdayMonth, yesterdayDay;

	let activityFormFunctions: { refresh(updatedActivityDate: ActivityDate): void; };

	init();

	function init(): void {
		setTodayDataForAddingNewActivity();
		setYesterdayDataForAddingNewActivity();
		setActivitiesShowed();
	}

	function setTodayDataForAddingNewActivity(): void {
		const today = new Date();
		todayYear = today.getFullYear();
		todayMonth = today.getMonth() + 1;
		todayDay = today.getDate();
	}

	function setYesterdayDataForAddingNewActivity(): void {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		yesterdayYear = yesterday.getFullYear();
		yesterdayMonth = yesterday.getMonth() + 1;
		yesterdayDay = yesterday.getDate();
	}

	function setActivitiesShowed(): void {
		if (all) showed = all;
		else if (last30) showed = all;
	}

	// UI Stuff // 
	let activityFormDialog: HTMLElement;
	function showActivityFormDialog(year: number, month: number, day: number, asModal = true) {
		try { 
			const updatedActivityDate = new ActivityDate(year, month, day);
			activityFormFunctions.refresh(updatedActivityDate);
			activityFormDialog[asModal ? "showModal" : "show"]();
		} catch (e) { throw new Error(e); }
	}

	function refreshActivities() { dispatch("refreshActivities"); }
	// UI Stuff // 
</script>

<div class="flex items-center justify-center w-full">
	<button class="btn btn-primary"
		on:click={ () => showActivityFormDialog(todayYear, todayMonth, todayDay) }
	>
		Log Today's weigth
	</button>

	<button class="btn btn-secondary"
		on:click={ () => showActivityFormDialog(yesterdayYear, yesterdayMonth, yesterdayDay) }
	>
		Log Yesterday's Activity
	</button>
</div>

{#if all}
	<div class="h-full flex flex-col overflow-hidden">
		<div class="flex-1">
			<table class="table">
				<thead>
					<tr>
						<th><span class="font-bold">Date</span></th>
						<th><span class="font-bold">Weight</span></th>
						<th><span class="font-bold">Calories</span></th>
						<th><span class="font-bold">Steps</span></th>
					</tr>
				</thead>

				<tbody>
					{#each all as a}
						<tr class="cursor-pointer" on:click={ () => showActivityFormDialog(a.year, a.month, a.day) } >
							<td>{a.year}-{a.month}-{a.day}</td>
							<td>{a.weight}</td>
							<td>{a.calories}</td>
							<td>{a.steps}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}

<dialog id="modal" class="modal" bind:this={activityFormDialog}>
	<form method="dialog" class="modal-box">
		<ActivityForm
			bind:functions={activityFormFunctions}
			on:saveActivity={() => {refreshActivities()}}
		/>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button on:click={() => { refreshActivities(); }}>close</button>
	</form>
</dialog>
