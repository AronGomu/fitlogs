<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ExerciceForm from "../lib/WorkoutForm/ExerciceForm.svelte";
	import { formatDateWithSpelledOutMonth } from "../shared/functions/Utilitary";
	import { Workout } from "../shared/class/Workout/Workout";
	import { Settings } from "../shared/class/Settings";
	import { StoreName, fetchSettings, getObjectByIdInDatabase } from "../shared/functions/Database";
	import WorkoutsPage from "./WorkoutsPage.svelte";
	import { WorkoutDate } from "../shared/class/Workout/WorkoutDate";
    import { getWorkoutFromDatabase } from "../shared/functions/database/workout";

	const dispatch = createEventDispatcher();
	export let urlWorkoutDate: string = null;
	let settings: Settings = new Settings();

	let workout: Workout;

	let isWorkoutLoaded: boolean = false;
	let doesWorkoutExist: boolean = true;


	init()

	function init() {
		fetchSettings().then((fs) => (settings = fs));

		const emptyWorkout = parseURLWorkoutDate()
		fetchWorkout(emptyWorkout);
	}

	function parseURLWorkoutDate(): Workout {
		console.log(urlWorkoutDate);
		const urlWorkoutDateSplitted = urlWorkoutDate.split('-');
		if (urlWorkoutDateSplitted.length < 3) {
			console.log(urlWorkoutDateSplitted)
			throw new Error("urlWorkoutDateSplitted is not right")
		}

		const year = Number(urlWorkoutDateSplitted[0]);
		const month = Number(urlWorkoutDateSplitted[1]);
		const day = Number(urlWorkoutDateSplitted[2]);

		const wd = new WorkoutDate(year, month, day);
		
		return new Workout(wd, []);
	}

	async function fetchWorkout(w: Workout) {
		const fetchedWorkout = await getWorkoutFromDatabase(w);

		if (!fetchWorkout) {
			workout = w;
		} else {
			workout = fetchedWorkout;
		}

		isWorkoutLoaded = true;
	}


	async function updateWorkout() {
		const fetchedWorkout = await updateInDatabase<Workout>(
			StoreName.WORKOUT,
			workout.id,
			workout,
			true,
		);

		setWorkout(fetchedWorkout);
	}

	function updateExercice(e, event) {
		updateWorkout();
	}

	/** Add a new exercice to the workout and update it in the database. */
	function newExercice() {
		workout.addNewExercice();
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

<!-- TODO : Make the exercice suggestions work from selecting and adding new ones -->

{#if !isWorkoutLoaded && doesWorkoutExist}
	<div class="flex items-center justify-center h-screen">
		<span class="text-center loading loading-spinner loading-lg"
		></span>
	</div>
{/if}

{#if !isWorkoutLoaded && !doesWorkoutExist}
	<div class="flex items-center justify-center h-screen">
		<span class="text-center text-error">
			ERROR : The workout searched does not exist !
		</span>
	</div>
{/if}

{#if isWorkoutLoaded}
	{workout | JSON}
	<div id="workout" class="flex flex-col items-center">
		<h1 class="text-xl">
			{formatDateWithSpelledOutMonth(
				workout.createdAt.getDate(),
			)}
		</h1>

		{#each workout.el as e, index}
			<span>index : {index}</span>
			<ExerciceForm
				{e}
				{index}
				on:update={(event) => updateExercice(e, event)}
			/>

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
			-->
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

		<button class="btn btn-primary w-30" on:click={newExercice}
			>Add Exercice</button
		>
	</div>
{/if}