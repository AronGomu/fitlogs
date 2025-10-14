<script lang="ts">
	import { formatDateWithSpelledOutMonth } from "../shared/functions/Utils";
	import { Workout, compareWorkouts } from "../shared/class/Workout/Workout";
	import { menuPath } from "../shared/store/menuPath";
	import { navigate } from "svelte-routing";
	import { getWorkoutsFromDatabase } from "../shared/database/workout";
	import Modal from "../lib/Generic/Modal.svelte";
	import NewWorkoutDateForm from "../lib/WorkoutForm/NewWorkoutDateForm.svelte";
	import { NewWorkoutDateFormEvents } from "../shared/enum/Events";
	import type { WorkoutDate } from "../shared/class/Workout/WorkoutDate";

	document.querySelector("html").setAttribute("data-theme", "black");

	let workouts: Workout[] = [];

	let showNewWorkoutDateForm: boolean = false;

	let isWorkoutsLoaded: boolean = false;

	init()

	async function init(): Promise<void> {
		menuPath.set("Workouts");
		await setWorkouts()
	}

	async function setWorkouts(): Promise<void> {
		workouts = await getWorkoutsFromDatabase();
		workouts.sort(compareWorkouts)
		isWorkoutsLoaded = true;
	}

	/** Creates a new empty workout in the database and add it in the GUI. */
	async function onNewWorkout() {
		showNewWorkoutDateForm = true;
	}

	async function openWorkout(wd: WorkoutDate) {
		console.log(`OPEN WORKOUT`, wd);
		navigate(
			`/fitlogs/workout/${wd.year}-${wd.month}-${wd.day}`,
		);
	}

	async function gotoMenu() {
		navigate("/fitlogs/");
	}
</script>

<div class="flex flex-row justify-center mb-4">
	<button class="btn btn-primary" on:click={onNewWorkout}>
		New Workout
	</button>
</div>


{#if !isWorkoutsLoaded}
	<div class="flex items-center justify-center h-screen">
		<span class="text-center loading loading-spinner loading-lg"></span>
	</div>
{/if}

{#if isWorkoutsLoaded}
	
	<div class="overflow-x-auto">
		<table class="table">
			<tbody>
				{#each workouts as w}
					<tr>
						<th
							class="cursor-pointer"
							on:click={() => {openWorkout(w.createdAt)}}
						>
							<span>
								{formatDateWithSpelledOutMonth(
									w.createdAt.getDate(),
								)}
							</span>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<div class="flex justify-center">
	<button class="btn btn-warning w-30 m-10" on:click={() => gotoMenu()}>Back To Menu</button>
</div>

<Modal 
	component={NewWorkoutDateForm} 
	events={NewWorkoutDateFormEvents} 
	bind:show={showNewWorkoutDateForm}
	on:submitTodayDate={e => openWorkout(e.detail)}
>
</Modal>
