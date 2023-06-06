{#if isMounted}
{#each esas as set, index}
<div class="collapse bg-base-300 p-1">
  <input type="checkbox" checked={set.isOpen} class="override-collapse-title"/> 
  <div class="collapse-title font-medium bg-base-200 override-collapse-title cursor-pointer">
      {`Set ${index+1} ${set.isOpen}`}
  </div>
  <div class="collapse-content bg-base-200 override-collapse-content">
    <div class="flex flex-row items-center">
      <InputNumber placeholder="Weight" className="input input-lg w-20 mr-0" metric={set.weight.metric}/>
      <span class="font-bold mx-2">X</span>
      <InputNumber placeholder="Reps" className="input input-lg w-14 ml-0 text-center" />
    </div>
  </div>
</div>
{/each}
{/if}

<script lang="ts">
  import { onMount } from "svelte";
  import { Exercice } from "../shared/class/Exercice";
  import { ExerciceSetAccordeon } from "../shared/class/ExerciceSetAccordeon";
  import InputNumber from "./InputNumber.svelte";
  import { wm } from './../shared/store/settingsStore';
  import type { WeightMetrics } from "../shared/enum/WeightMetrics";

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


  function toggleSetAccordeon(set: ExerciceSetAccordeon) {
    console.log(set.isOpen);
    set.isOpen = !set.isOpen;
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
</style>