<script lang="ts">
  import plusBoxMultiple from '@iconify/icons-mdi/plus-box-multiple';
  import trashCanOutline from '@iconify/icons-mdi/trash-can-outline';
  import Icon from '@iconify/svelte';
  import lodash from 'lodash';
  import { onMount } from "svelte";
  import { Exercice } from "../shared/class/Exercice";
  import { Workout } from "../shared/class/Workout";
  import { WeightMetrics } from "../shared/enum/WeightMetrics";
  import { getReducedStringMetric } from "../shared/functions/Utilitary";
  import { saveWorkout } from '../shared/store/saveStore';
  import { wm } from '../shared/store/settingsStore';
  import AutoCompleteInput from "./AutoCompleteInput.svelte";
  import ExerciceForm from "./ExerciceForm.svelte";
  
  // Store variables
  let weightMetric: WeightMetrics;
  $: { weightMetric = $wm;}

  /** Workout object */
  export let w: Workout;

  if (!w) {
    w = new Workout()
  }

  onMount(() => { })

  function newExercice(): void {
    w.exercices.push(new Exercice("", [], true));
    w.exercices = w.exercices;
    saveWorkout(w);
  }

  function duplicateExercice(e: Exercice): void {
    w.exercices.push(lodash.cloneDeep(e));
    w.exercices = w.exercices;
    saveWorkout(w);
  }

  function deleteExercice(e: Exercice): void {
    for (let i = 0; i < w.exercices.length; i++) {
      if (e === w.exercices[i]) {
        w.exercices.splice(i,1);
        w.exercices = w.exercices;
      }
    }
    saveWorkout(w);
  }
</script>


<div id="workout" class="flex flex-col items-center">
    
  {#each w.exercices as e}
  <div class="exercice-container collapse collapse-arrow bg-base-100 my-2 w-5/6 override-collapse w-full">
    
    <input type="checkbox" name="exercice" checked={e.isOpen} class="cursor-pointer"/>
    
    <!-- TITLE -->
    <div class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title">
      <div class="flex flex-row justify-between w-full overflow-visible">
        <AutoCompleteInput type="text" value="{e.name}" placeholder="Exercice Name" class="bg-base-500 input input-ghost input-lg text-primary z-10 override-input-exerciceName" on:input={(event) => {e.name = event['explicitOriginalTarget']['value']; saveWorkout(w);}}/>
      </div>
      <span class="text-secondary text-sm">{`${e.sets.length} Sets`}</span>
      {#if e.getMaxWeight(weightMetric)}
         <span class="text-secondary text-sm">{` - Max Weight : ${e.getMaxWeight(weightMetric)}${getReducedStringMetric(weightMetric)}`}</span>
      {/if}
    </div>

    <!-- CONTENT -->
    <div class="collapse-content">

      <ExerciceForm e={e} w={w}/>

      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div tabindex="0" class="collapse text-red-500"> 
        <input type="checkbox" class="override-input-advancedOptions"/> 
        <div class="collapse-title text-xl font-medium flex justify-center override-input-advancedOptions"></div>
        <div class="collapse-content flex justify-around"> 

          <button class="btn btn-neutral" on:click={() => duplicateExercice(e)}>
            Duplicate
            <Icon icon={plusBoxMultiple} color="white" width="30" height="30"/>
          </button>

          <button class="btn btn-error" on:click={() => deleteExercice(e)}>
            Delete
            <Icon icon={trashCanOutline} color="white" width="30" height="30"/>
          </button>
          
        </div>
      </div>
      
    </div>
  </div>
  {/each}

  <button class="btn btn-primary w-4/5" on:click={newExercice}>New Exercice</button>
</div>


<style>

  .override-input-exerciceName {
    padding: 0.5rem 0 0 0;
    font-size: 1.125rem;
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