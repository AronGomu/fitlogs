{#each eas as ea}
<div class="collapse bg-base-300">
  <input type="radio" checked={ea.isOpen} /> 
  <div class="collapse-title text-xl font-medium">
      {`${ea.name} - ${ea.sets.length} Sets - ${ea.getMaxWeight(weightMetric)}${getReducedStringMetric(weightMetric)} - ${ea.isOpen}`}
  </div>
  <div class="collapse-content">
    <ExerciceForm exercice={ea.getExercice()}/>
  </div>
</div>
{/each}

<ExerciceMenu />

<script lang="ts">
  import { onMount } from "svelte";
  import ExerciceForm from "../lib/ExerciceForm.svelte";
  import ExerciceMenu from "../lib/ExerciceMenu.svelte";
  import { wm } from './../shared/store/settingsStore';
  import { ExerciceAccordeon } from "../shared/class/ExerciceAccordeon";
  import { ExerciceSet } from "../shared/class/ExerciceSet";
  import { getReducedStringMetric } from "../shared/functions/Utilitary";
  import { WeightMetrics } from "../shared/enum/WeightMetrics";
  import { Weight } from "../shared/class/Weight";

  let weightMetric: WeightMetrics;
  $: {
    weightMetric = $wm;
  }

  /** List of the Exercices Accordeon. */
  let eas: ExerciceAccordeon[] = [];

  onMount(() => {
    const defaultSets: ExerciceSet[] = [
      new ExerciceSet(10, new Weight(50, WeightMetrics.Kilos)),
      new ExerciceSet(10, new Weight(50, WeightMetrics.Kilos)),
      new ExerciceSet(10, new Weight(50, WeightMetrics.Kilos))
    ]

    eas = [
      new ExerciceAccordeon("Bench Press", defaultSets, true),
      new ExerciceAccordeon("Squat", defaultSets, true),
    ]
  })
</script>