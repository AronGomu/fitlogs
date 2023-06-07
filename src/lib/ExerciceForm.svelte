{#if isMounted}
{#each esas as set, index}
<div class="collapse bg-base-300 p-1">
  <input type="checkbox" checked={set.isOpen} class="override-collapse-title"/> 
  <div class="collapse-title font-medium bg-base-200 override-collapse-title cursor-pointer">
      {`Set ${index+1}`}
  </div>
  <div class="collapse-content bg-base-200 override-collapse-content z-10">
    <div class="flex flex-row items-center">
      <InputNumber placeholder="Weight" className="input w-24 mr-0 text-left" metric={set.weight.metric} value={set.weight.weight}/>
      <span class="font-bold mx-2">X</span>
      <InputNumber placeholder="Reps" className="input w-14 ml-0 text-center" value={set.repetitions}/>
    </div>
  </div>
</div>
{/each}

<div class="flex justify-center w-full mt-2">
  <button class="btn btn-primary w-4/5 override-addExerciceButton" on:click={addSet}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height=30 width=30 class="text-primary"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--darkreader-inline-stroke: #e8e6e3; color: white" data-darkreader-inline-stroke=""></path> </g> </g></svg>
    Add Set
  </button>
</div>
{/if}

<script lang="ts">
  import { onMount } from "svelte";
  import { Exercice } from "../shared/class/Exercice";
  import { ExerciceSetAccordeon } from "../shared/class/ExerciceSetAccordeon";
  import InputNumber from "./InputNumber.svelte";
  import { wm } from './../shared/store/settingsStore';
  import type { WeightMetrics } from "../shared/enum/WeightMetrics";
  import { Weight } from "../shared/class/Weight";

  let weightMetric: WeightMetrics;
  $: {
    weightMetric = $wm;
  }

  let isMounted: boolean = false;

  /** Exercice that must be passed in argument. */
  export let exercice: Exercice;
  /** List Exercice Set Accordeon extracted from the exercice given in input. */
  let esas: ExerciceSetAccordeon[];

  onMount(() => {
    if (exercice.sets) {
      esas = [];
      for (const es of exercice.sets) {
        esas.push(new ExerciceSetAccordeon(es.repetitions, es.weight, true))
      }
    }

    isMounted = true;
  })

  function addSet(): void {
    let lastWeight: Weight = new Weight(0, weightMetric);
    if (esas && esas.length > 0) lastWeight.weight = esas[esas.length-1].weight.weight;
    esas.push(new ExerciceSetAccordeon(0, lastWeight, true));
    esas = esas;
  }

</script>

<style>
  .override-collapse-title {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    min-height: 1rem;
  }

  .override-collapse-content {
    padding: 0.5;
  }

  .override-addExerciceButton {
    font-size: large;
  }
</style>