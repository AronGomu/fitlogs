<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ExerciceForm from "../lib/WorkoutForm/ExerciceForm.svelte";
	import { formatDateWithSpelledOutMonth } from "../shared/functions/Utilitary";
	import { Workout } from "../shared/class/Workout/Workout";
	import { Settings } from "../shared/class/Settings";
	import { StoreName, fetchSettings, getObjectByIdInDatabase } from "../shared/functions/Database";
	import WorkoutsPage from "./WorkoutsPage.svelte";
	import { WorkoutDate } from "../shared/class/Workout/WorkoutDate";
	import { getWorkoutFromDatabase, putWorkoutInDatabase } from "../shared/functions/database/workout";
    import LiftInput from "../lib/LiftForm/LiftInput.svelte";
    import LiftSelector from "../lib/LiftForm/LiftSelector.svelte";

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

		console.log(w)	
		console.log(fetchedWorkout)	

		if (!fetchedWorkout) {
			workout = w;
		} else {
			workout = fetchedWorkout;
		}

		console.log(workout)
	}

	async function updateWorkout() {
		console.log(`workout`, workout)
		const fetchedWorkout = await putWorkoutInDatabase(workout);
		console.log(`fetchedWorkout`, fetchedWorkout)

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
{/if}

{#if isWorkoutLoaded}
	<div id="workout" class="flex flex-col items-center">
		<h1 class="text-xl">
			{formatDateWithSpelledOutMonth(
				workout.createdAt.getDate(),
			)}
		</h1>

		{#each workout.el as e, index}
			<span>index : {index}</span>
			<LiftInput lift={e.lift} on:openLiftSelector={() => openLiftSelectorFormDialog() } />
			<!-- <ExerciceForm -->
			<!-- 	{e} -->
			<!-- 	{index} -->
			<!-- 	on:update={(event) => updateExercice(e, event)} -->
			<!-- /> -->

			<!-- 	<div -->
			<!-- 		class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title" -->
			<!-- 	> -->
			<!-- 		<div -->
			<!-- 			class="flex flex-row justify-between w-full overflow-visible override-input-exerciceName" -->
			<!-- 		> -->
			<!-- 			<AutoCompleteInput -->
			<!-- 				type="text" -->
			<!-- 				value={e.lift.name} -->
			<!-- 				placeholder="Exercice Name" -->
			<!-- 				class="bg-base-500 input input-ghost input-lg text-primary z-10" -->
			<!-- 				on:update={(event) => -->
			<!-- 					updateExerciceName( -->
			<!-- 						event, -->
			<!-- 						e, -->
			<!-- 					)} -->
			<!-- 			/> -->
			<!-- 		</div> -->
			<!-- 		{#if !e.isSelfOpen} -->
			<!-- 			<span -->
			<!-- 				class="text-secondary text-sm" -->
			<!-- 				>{`${e.series.length} Sets`} -->
			<!-- 			</span> -->
			<!-- 			{#if e.getMaxWeight(settings.wm)} -->
			<!-- 				<span -->
			<!-- 					class="text-secondary text-sm" -->
			<!-- 					>{` - Max : ${e.getMaxWeight( -->
			<!-- 						settings.wm, -->
			<!-- 					)}${getReducedStringMetric( -->
			<!-- 						settings.wm, -->
			<!-- 					)}`} -->
			<!-- 					{e.isSelfOpen} -->
			<!-- 					{e.isExtraOpen} -->
			<!-- 				</span> -->
			<!-- 			{/if} -->
			<!-- 		{/if} -->
			<!-- 	</div> -->
			<!---->

			<!-- 	{#if e.isSelfOpen} -->
			<!-- 		<div class="collapse-content"> -->
			<!-- 			<ExerciceForm -->
			<!-- 				{e} -->
			<!-- 				on:update={(event) => { -->
			<!-- 					/* console.log(event.detail); */ -->
			<!-- 					/* workoutGUI.el = event.detail; */ -->
			<!-- 					updateWorkout(); -->
			<!-- 				}} -->
			<!-- 			/> -->
			<!---->
			<!-- 			<!-- svelte-ignore a11y-click-events-have-key-events -->

			<!-- 			<div -->
			<!-- 				class="w-full flex justify-end cursor-pointer" -->
			<!-- 				on:click={() => -->
			<!-- 					openExerciceExtra( -->
			<!-- 						e, -->
			<!-- 					)} -->
			<!-- 			> -->
			<!-- 				{#if e.isExtraOpen} -->
			<!-- 					<Icon -->
			<!-- 						icon={minusIcon} -->
			<!-- 						color="blue" -->
			<!-- 						width="15" -->
			<!-- 						height="15" -->
			<!-- 					/> -->
			<!-- 				{:else} -->
			<!-- 					<Icon -->
			<!-- 						icon={plusIcon} -->
			<!-- 						color="blue" -->
			<!-- 						width="15" -->
			<!-- 						height="15" -->
			<!-- 					/> -->
			<!-- 				{/if} -->
			<!-- 			</div> -->
			<!-- 		</div> -->
			<!-- 	{/if} -->
			<!-- </div> -->
		{/each}

		<button class="btn btn-primary w-30" on:click={() => onClickAddExercice()}>Add Exercice</button>
	</div>
{/if}

<dialog id="modal" class="modal" bind:this={liftSelectorFormDialog}>
	<form method="dialog" class="modal-box">
	<LiftSelector  />	
	</form>
	<form method="dialog" class="modal-backdrop">
		<button
			on:click={() => {
				updateWorkout();
			}}>close
		</button>
	</form>
</dialog>
