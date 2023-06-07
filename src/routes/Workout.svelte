<div class="flex flex-col items-center">
    {#each eas as ea}
    <div class="collapse collapse-arrow bg-base-300 my-2 w-5/6 override-collapse w-full">
      <input type="checkbox" name="exercice" checked={ea.isOpen} class="cursor-pointer"/>
      <div class="collapse-title text-xl font-medium text-primary w-full mx-2 override-collapse-title">
        <div class="flex flex-row justify-between w-full">
          <input type="text" value="{ea.name}" placeholder="Exercice Name" class="input input-ghost input-sm w-2/3 text-primary z-10 override-input-exerciceName" on:focus={selectWholeTextOnFocus} />
        </div>
        <span class="text-secondary text-sm">{`${ea.sets.length} Sets - Max Weight : ${ea.getMaxWeight(weightMetric)}${getReducedStringMetric(weightMetric)}`}</span>
      </div>
      <div class="collapse-content">
        <ExerciceForm exercice={ea.getExercice()}/>
      </div>
    </div>
    {/each}

  <button class="btn btn-primary w-4/5" on:click={newExercice}>New Exercice</button>
</div>

<ExerciceMenu />

<script lang="ts">
  import { onMount } from "svelte";
  import ExerciceForm from "../lib/ExerciceForm.svelte";
  import ExerciceMenu from "../lib/ExerciceMenu.svelte";
  import { wm } from './../shared/store/settingsStore';
  import { ExerciceAccordeon } from "../shared/class/ExerciceAccordeon";
  import { ExerciceSet } from "../shared/class/ExerciceSet";
  import { getReducedStringMetric, selectWholeTextOnFocus } from "../shared/functions/Utilitary";
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
      new ExerciceSet(10, new Weight(50, WeightMetrics.Kilos))
    ]

    eas = [
      new ExerciceAccordeon("Bench Press", defaultSets, false),
      new ExerciceAccordeon("Squat", defaultSets, true),
    ]
  })

  function newExercice(): void {
    eas.push(new ExerciceAccordeon("", [], true));
    eas = eas;
  }
</script>

<style>

  .override-input-exerciceName {
    padding: 0.5rem 0 0 0;
    font-size: 1.125rem;
  }

  .override-collapse {
    width: 90%;
  }

  .override-collapse-title {
    padding: 1rem;
  }
</style>