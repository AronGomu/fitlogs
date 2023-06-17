<div id="workout" class="flex flex-col items-center">
    {#each exercices as exercice}
    <div class="exercice-container collapse collapse-arrow bg-base-300 my-2 w-5/6 override-collapse w-full">
      <input type="checkbox" name="exercice" checked={exercice.isOpen} class="cursor-pointer"/>
      <div class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title">
        <div class="flex flex-row justify-between w-full">
          <AutoCompleteInput type="text" value="{exercice.name}" placeholder="Exercice Name" class="input input-ghost input-sm text-primary z-10 override-input-exerciceName"/>
        </div>
        <span class="text-secondary text-sm">{`${exercice.sets.length} Sets - Max Weight : ${exercice.getMaxWeight(weightMetric)}${getReducedStringMetric(weightMetric)}`}</span>
      </div>
      <div class="collapse-content">
        <ExerciceForm exercice={exercice}/>
        <div tabindex="0" class="collapse text-red-500"> 
          <input type="checkbox" class="override-input-advancedOptions"/> 
          <div class="collapse-title text-xl font-medium flex justify-center override-input-advancedOptions"></div>
          <div class="collapse-content flex justify-between"> 
            <button class="btn btn-neutral" on:click={() => duplicateExercice(exercice)}>Duplicate<Icon icon={plusBoxMultiple} color="white" width="30" height="30"/></button>
            <button class="btn btn-error" on:click={() => deleteExercice(exercice)}>Delete<Icon icon={trashCanOutline} color="white" width="30" height="30"/></button>
          </div>
        </div>
        
      </div>
    </div>
    {/each}

  <button class="btn btn-primary w-4/5" on:click={newExercice}>New Exercice</button>
</div>

<script lang="ts">
  import { onMount } from "svelte";
  import ExerciceForm from "../lib/ExerciceForm.svelte";
  import { wm } from './../shared/store/settingsStore';
  import { getReducedStringMetric } from "../shared/functions/Utilitary";
  import { WeightMetrics } from "../shared/enum/WeightMetrics";
  import { Weight } from "../shared/class/Weight";
  
  import { Exercice } from "../shared/class/Exercice";
  import { Set } from "../shared/class/Set";
  
  import AutoCompleteInput from "../lib/AutoCompleteInput.svelte";

  import lodash from 'lodash';
  
  // imported icons
  import Icon from '@iconify/svelte';
  import trashCanOutline from '@iconify/icons-mdi/trash-can-outline';
  import plusBoxMultiple from '@iconify/icons-mdi/plus-box-multiple';

  let weightMetric: WeightMetrics;
  $: { weightMetric = $wm;}

  /** List of the Exercices Accordeon. */
  let exercices: Exercice[] = [];

  // !! MOCK
  const bpSets: Set[] = [
      new Set(0, 10, new Weight(50, WeightMetrics.Kilos), false),
      new Set(1, 9, new Weight(50, WeightMetrics.Kilos), false),
      new Set(2, 8, new Weight(50, WeightMetrics.Kilos), false),
    ]

    const sSets: Set[] = [
      new Set(0, 10, new Weight(100, WeightMetrics.Kilos), false),
      new Set(1, 9, new Weight(100, WeightMetrics.Kilos), false),
      new Set(2, 8, new Weight(100, WeightMetrics.Kilos), false)
    ]

    exercices = [
      new Exercice("Bench Press", bpSets, false),
      new Exercice("Squat", sSets, true),
    ]
    // !! MOCK

  onMount(() => {})

  function newExercice(): void {
    exercices.push(new Exercice("", [], true));
    exercices = exercices;
  }

  function duplicateExercice(e: Exercice): void {
    exercices.push(lodash.cloneDeep(e));
    exercices = exercices;
  }

  function deleteExercice(e: Exercice): void {
    for (let i = 0; i < exercices.length; i++) {
      if (e === exercices[i]) {
        exercices.splice(i,1);
        exercices = exercices;
      }
    }
  }
</script>

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