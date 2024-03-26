<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { formatDateWithSpelledOutMonth } from "../shared/functions/Utilitary";
	import { Workout } from "../shared/class/Workout/Workout";
	import { Settings } from "../shared/class/Settings";
	import { fetchSettings } from "../shared/functions/Database";
	import { WorkoutDate } from "../shared/class/Workout/WorkoutDate";
	import { getWorkoutFromDatabase, putWorkoutInDatabase } from "../shared/functions/database/workout";
	import LiftInput from "../lib/LiftForm/LiftInput.svelte";
	import LiftSelector from "../lib/LiftForm/LiftSelector.svelte";
	import LiftForm from "../lib/LiftForm/LiftForm.svelte";

	const dispatch = createEventDispatcher();
	export let urlWorkoutDate: string = null;
	let settings: Settings = new Settings();

	let workout: Workout;

	let isWorkoutLoaded: boolean = false;

	// UI Stuff
	let liftSelectorFormDialog: HTMLElement;
	function openLiftSelectorFormDialog(asModal = true) {
		liftSelectorFormDialog[asModal ? "showModal" : "show"]();
	}

	let liftFormFormDialog: HTMLElement;
	function openLiftFormFormDialog(asModal = true) {
		console.log(`sdlfkgjuhsdfhjkgbsdhjklfgbjklsdfhgksj`)
		liftFormFormDialog[asModal ? "showModal" : "show"]();
	}

	init()

	async function init() {
		fetchSettings().then((fs) => (settings = fs));

		const emptyWorkout = parseURLWorkoutDate()
		await fetchWorkout(emptyWorkout);

		console.log(workout)	
		isWorkoutLoaded = true;
	}

	function parseURLWorkoutDate(): Workout {
		const urlWorkoutDateSplitted = urlWorkoutDate.split('-');
		if (urlWorkoutDateSplitted.length < 3) {
			throw new Error("urlWorkoutDateSplitted is not right")
		}

		const year = Number(urlWorkoutDateSplitted[0]);
		const month = Number(urlWorkoutDateSplitted[1]);
		const day = Number(urlWorkoutDateSplitted[2]);

		const wd = new WorkoutDate(year, month, day);
		
		return new Workout(wd, []);
	}

	async function fetchWorkout(w: Workout) {

		const fetchedWorkout: Workout = await getWorkoutFromDatabase(w.getKey());

		if (!fetchedWorkout) {
			workout = w;
		} else {
			workout = fetchedWorkout;
		}
	}

	async function updateWorkout() {
		const fetchedWorkout = await putWorkoutInDatabase(workout);

		if (!fetchedWorkout) {
			throw new Error("Updated workout is null in database ?")
		}

		workout = fetchedWorkout;
	}


	function onClickAddExercice() {
		console.log("onClickAddExercice")
		workout.addNewExercice();
		updateWorkout();
	}

	function updateExercice(e, event) {
		updateWorkout();
	}


	/** Add a new exercice to the workout and update it in the database. */
	function newExercice() {
		// workout.addNewExercice();
		updateWorkout();
	}

	/** Add an exercice from the workout and update it in the database. */
	function deleteExercice(e: Exercice) {
		for (let i = 0; i < workout.el.length; i++) {
			if (e === workout.el[i]) workout.el.splice(i, 1);
		}
		updateWorkout();
	}
</script>

{#if !isWorkoutLoaded}
	<div class="flex items-center justify-center h-screen">
		<span class="text-center loading loading-spinner loading-lg"/>
	</div>
{:else}
	<div id="workout" class="flex flex-col items-center">
		<h1 class="text-xl">
			{formatDateWithSpelledOutMonth(
				workout.createdAt.getDate(),
			)}
		</h1>

		{#each workout.el as e, index}
			<span>index : {index}</span>
			<LiftInput lift={e.lift} on:openLiftSelector={() => openLiftSelectorFormDialog() } />
		{/each}

		<button class="btn btn-primary w-30" on:click={() => onClickAddExercice()}>Add Exercice</button>
	</div>
{/if}

<dialog id="modal" class="modal" bind:this={liftSelectorFormDialog}>
	<form method="dialog" class="modal-box h-3/4">
	<LiftSelector on:openLiftForm={() => openLiftFormFormDialog() }></LiftSelector>	
	</form>
	<form method="dialog" class="modal-backdrop">
		<button
			on:click={() => {
				updateWorkout();
			}}>close
		</button>
	</form>
</dialog>

<dialog id="modal" class="modal" bind:this={liftFormFormDialog}>
	<form method="dialog" class="modal-box h-3/4">
	<LiftForm></LiftForm>	
	</form>
	<form method="dialog" class="modal-backdrop">
		<button
			on:click={() => {
				updateWorkout();
			}}>close
		</button>
	</form>
</dialog>
