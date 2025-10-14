<script lang="ts">
	import minusIcon from "@iconify/icons-mdi/minus";
	import plusIcon from "@iconify/icons-mdi/plus";
	import Icon from "@iconify/svelte";
	import { Setting } from "../../shared/class/Settings";
	import { Exercice } from "../../shared/class/Workout/Exercice";
	import {
		Workout,
		getRealWorkout,
	} from "../../shared/class/Workout/Workout";
	import { getReducedStringMetric } from "../../shared/enum/WeightMetrics";
	import {
		StoreName,
		getSettingFromDatabase,
		getObjectByIdInDatabase,
		updateInDatabase,
	} from "../../shared/functions/Database";
	import ExerciceForm from "./ExerciceForm.svelte";
	import AutoCompleteInput from "./inputs/AutoCompleteInput.svelte";
	import type { Weight } from "../../shared/class/Workout/Weight";
	import { createEventDispatcher } from "svelte";
	import { formatDateWithSpelledOutMonth } from "../../shared/functions/Utilitary";
	import Workouts from "../../routes/Workouts.svelte";

  const dispatch = createEventDispatcher();
  export let id: number = null;

	let setting: Setting = new Setting();
	getSettingFromDatabase().then((fs) => (setting = fs));

  let isWorkoutLoaded: boolean = false;
  let doesWorkoutExist: boolean = true;
  let workout: Workout = null;
  if (!id) {
    isWorkoutLoaded = true;
    doesWorkoutExist = true;
  } else {
    fetchWorkout();
  }

  async function setWorkout(fetchedWorkout: Workout) {
    workout = await getRealWorkout(fetchedWorkout);
  }

  async function fetchWorkout() {
    const fetchedWorkout = await getObjectByIdInDatabase<Workout>(
      "workout-store",
      Number(id)
    );

    if (!fetchedWorkout) {
      isWorkoutLoaded = true;
      doesWorkoutExist = false;
      throw new Error(`No workout if id=${id} found in the database`);
    }

    await setWorkout(fetchedWorkout);

    isWorkoutLoaded = true;
  }

  async function updateWorkout() {
    const fetchedWorkout = await updateInDatabase<Workout>(
      "workout-store",
      workout.id,
      workout,
      true
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
    <span class="text-center loading loading-spinner loading-lg"></span>
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
  <div id="workout" class="flex flex-col items-center">
    <h1 class="text-xl">
      {formatDateWithSpelledOutMonth(workout.createdAt.getDate())}
    </h1>

    {#each workout.el as e, index}
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
			<!-- 			{#if e.getMaxWeight(setting.wm)} -->
			<!-- 				<span -->
			<!-- 					class="text-secondary text-sm" -->
			<!-- 					>{` - Max : ${e.getMaxWeight( -->
			<!-- 						setting.wm, -->
			<!-- 					)}${getReducedStringMetric( -->
			<!-- 						setting.wm, -->
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
