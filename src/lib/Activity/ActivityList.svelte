<script lang="ts">
	import type { Activity } from "../../shared/class/Activity/Activity";
	import ActivityForm from "./ActivityForm.svelte";
	import { ActivityDate } from "../../shared/class/Activity/ActivityDate";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let activities: Activity[] = null;
	export const today = new Date();
	export const todayYear = today.getFullYear();
	export const todayMonth = today.getMonth() + 1;
	export const todayDay = today.getDate();

	let activityFormFunctions: {
		refresh(updatedActivityDate: ActivityDate): void;
	};

	// UI Stuff
	let activityFormDialog: HTMLElement;
	function showActivityFormDialog(
		year: number,
		month: number,
		day: number,
		asModal = true,
	) {
		try {
			activityFormFunctions.refresh(
				new ActivityDate(year, month, day),
			);
			activityFormDialog[asModal ? "showModal" : "show"]();
		} catch (e) {
			throw new Error(e);
		}
	}

	function refreshActivities() {
		dispatch("refreshActivities");
	}
</script>

<div class="flex items-center justify-center w-full">
	<button
		class="btn btn-primary"
		on:click={() =>
			showActivityFormDialog(todayYear, todayMonth, todayDay)}
		>Log Today's Activity</button
	>
</div>

{#if activities}
	<div class="h-full flex flex-col overflow-hidden">
		<div class="flex-1 overflow-y-auto">
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<th>
							<span class="font-bold"
								>Date</span
							>
						</th>
						<th>
							<span class="font-bold"
								>Weight</span
							>
						</th>
						<th>
							<span class="font-bold"
								>Calories</span
							>
						</th>
						<th>
							<span class="font-bold"
								>Steps</span
							>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each activities as a}
						<tr
							class="cursor-pointer"
							on:click={() =>
								showActivityFormDialog(
									a.year,
									a.month,
									a.day,
								)}
						>
							<td
								>{a.year}-{a.month}-{a.day}</td
							>
							<td>{a.weight}</td>
							<td>{a.calories}</td>
							<td>{a.steps}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<!-- content here -->
{/if}

<dialog id="modal" class="modal" bind:this={activityFormDialog}>
	<form method="dialog" class="modal-box">
		<ActivityForm
			bind:functions={activityFormFunctions}
			on:saveActivity={() => refreshActivities()}
		/>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button
			on:click={() => {
				refreshActivities();
			}}>close</button
		>
	</form>
</dialog>
