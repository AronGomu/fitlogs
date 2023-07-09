<script lang="ts">
  import chevronDown from '@iconify/icons-mdi/chevron-down';
  import plusBoxMultiple from '@iconify/icons-mdi/plus-box-multiple';
  import trashCanOutline from '@iconify/icons-mdi/trash-can-outline';
  import Icon from '@iconify/svelte';
  import lodash from 'lodash';
  import { onMount } from "svelte";
  import { Exercice } from "../../shared/class/Exercice";
  import { ExerciceGUI } from '../../shared/class/ExerciceGUI';
  import { Workout } from "../../shared/class/Workout";
  import { WorkoutGUI } from '../../shared/class/WorkoutGUI';
  import { WeightMetrics } from "../../shared/enum/WeightMetrics";
  import { saveWorkout } from '../../shared/store/saveStore';
  import { wm } from '../../shared/store/settingsStore';
  import ExerciceForm from "./ExerciceForm.svelte";
  import AutoCompleteInput from './inputs/AutoCompleteInput.svelte';
  
  // Store variables
  let weightMetric: WeightMetrics;
  wm.subscribe((wm: WeightMetrics) => {
    weightMetric = wm;
  })
  // $: { weightMetric = $wm;}

  /** Workout object */
  export let workout: WorkoutGUI;

  if (!workout) {
    workout = new WorkoutGUI(new Workout());
  }

  onMount(() => { })

  /** Update the list, to refresh it and the save the modification in the storage. */
  function updateAndSave() {
    workout.el = workout.el;
    saveWorkout(workout.convertToWorkout());
  }

  function newExercice() {
    workout.el.push(new ExerciceGUI("", [], true));
    updateAndSave();
  }

  function duplicateExercice(e: Exercice) {
    workout.el.push(lodash.cloneDeep(e));
    updateAndSave();
  }

  function deleteExercice(e: Exercice) {
    for (let i = 0; i < workout.el.length; i++) {
      if (e === workout.el[i]) workout.el.splice(i,1);
    }
    updateAndSave();
  }
</script>


<div id="workout" class="flex flex-col items-center">
    
  {#each workout.el as e}
  <div class="exercice-container collapse collapse-arrow bg-base-100 my-2 w-5/6 override-collapse w-full">
    
    <input type="checkbox" name="exercice" checked={e.isSelfOpen} class="cursor-pointer"/>
    
    <!-- TITLE -->
    <div class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title">
      <div class="flex flex-row justify-between w-full overflow-visible override-input-exerciceName">
        <AutoCompleteInput type="text" value="{e.n}" placeholder="Exercice Name" class="bg-base-500 input input-ghost input-lg text-primary z-10" on:input={(event) => {e.n = event.detail['value']; saveWorkout(workout.convertToWorkout());}} on:selectSuggestion={() => saveWorkout(workout.convertToWorkout())}/>
      </div>
      <!-- <span class="text-secondary text-sm">{`${e.sets.length} Sets`}</span>
      {#if e.getMaxWeight(weightMetric)}
         <span class="text-secondary text-sm">{` - Max Weight : ${e.getMaxWeight(weightMetric)}${getReducedStringMetric(weightMetric)}`}</span>
      {/if} -->
    </div>

    <!-- CONTENT -->
    {#if e.isSelfOpen}
       <!-- content here -->
       <div class="collapse-content">
   
         <ExerciceForm e={e} w={workout}/>
   
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <div class="w-full flex justify-end cursor-pointer" on:click={() => e.isMenuOpen = !e.isMenuOpen}>
           <Icon icon={chevronDown} color="red" width="15" height="15"/>
         </div>
   
         
         {#if e.isMenuOpen}
            <div class="flex flex-row justify-between">
              <button class="btn btn-neutral" on:click={() => duplicateExercice(e)}>
                Duplicate
                <Icon icon={plusBoxMultiple} color="white" width="30" height="30"/>
              </button>
        
              <button class="btn btn-error" on:click={() => deleteExercice(e)}>
                Delete
                <Icon icon={trashCanOutline} color="white" width="30" height="30"/>
              </button>
            </div>
         {/if}
       </div>
    {/if}
  </div>
  {/each}

  <button class="btn btn-primary w-30" on:click={newExercice}>New Exercice</button>
</div>


<style>

  .override-input-exerciceName {
    padding: 0.5rem 0 0 0 !important;
    font-size: 1.125rem !important;
  }

  .override-input-advancedOptions {
    padding: 0 0 0 0;
    min-height: 2rem;
  }

  .override-collapse {
    width: 90%;
  }

  .override-collapse-title {
    padding: 1rem;
  }
</style>