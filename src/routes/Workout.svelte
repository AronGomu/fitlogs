<!-- TODO:
  MAKE TITLE EXERCICE INPUT MORE SEAMLESS AND THINNER
  CHANGE VISIBILITY ON CHEVRON CLICK
  PUT SOME PADDING RIGHT ON CHEVRON
  PUT CHEVRON MORE IN CORNER AND BIGGER
  DESACTIVATE TOGGLING OF INPUT COLLAPSE COMPONENT
-->

<div class="flex flex-col items-center">
    {#each eas as ea}
    <div class="collapse bg-base-300 my-2 w-5/6 override-collapse w-full">
      <input type="checkbox" checked={ea.isOpen} class="override-input"/>
      <div class="collapse-title text-xl font-medium cursor-pointer text-primary w-full mx-2 override-collapse-title">
        <div class="flex flex-row justify-between w-full">
          <input type="text" value="{ea.name}" placeholder="Exercice Name" class="input input-bordered input-md w-2/3 max-w-xs text-primary" />
          <img src={DownChevron} alt="" srcset="" height="20" width="20">
        </div>
        <span class="text-secondary text-sm">{`${ea.sets.length} Sets - ${ea.getMaxWeight(weightMetric)}${getReducedStringMetric(weightMetric)} - ${ea.isOpen}`}</span>
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
  import { getReducedStringMetric } from "../shared/functions/Utilitary";
  import { WeightMetrics } from "../shared/enum/WeightMetrics";
  import { Weight } from "../shared/class/Weight";
  // import InlineSVG from 'svelte-inline-svg'

  import DownChevron from './../assets/icons/down-chevron.svg';
  import Icon from "../lib/Icon.svelte";

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
      new ExerciceAccordeon("Bench Press", defaultSets, false),
      new ExerciceAccordeon("Squat", defaultSets, true),
    ]
  })

  function newExercice(): void {
    eas.push(new ExerciceAccordeon("", [], true));
    eas = eas;
  }

  function toggleExerciceSetAccordeon(ea: ExerciceAccordeon) {
    ea.isOpen = !ea.isOpen;
    eas = eas;
  }
</script>

<style>
  .override-input {
    height: 0px;
  }

  .override-collapse {
    width: 90%;
  }

  .override-collapse-title {
    padding: 1rem;
  }
</style>