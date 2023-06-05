{#if isMounted}
{#each esas as set, index}
<div class="collapse bg-base-300">
  <input type="radio" checked={set.isOpen} /> 
  <div class="collapse-title font-medium">
      {`Set ${index}`}
  </div>
  <div class="collapse-content">
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

</script>