{#if isMounted && exercice && exercice.sets}
{#each exercice.sets as set, i}
<div class="collapse bg-base-300 p-1 ease-in-out duration-300;" bind:this={set.e}>
  <input type="checkbox" checked={set.isOpen} class="override-collapse-title" on:mouseenter={() => {setHammer(set)}}/> 
  <div class="collapse-title font-medium bg-base-200 override-collapse-title cursor-pointer">
      {`Set ${i+1}`}
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
  <button class="btn btn-primary w-4/5 override-addExerciceButton" on:click={addSet} >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height=30 width=30 class="text-primary"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--darkreader-inline-stroke: #e8e6e3; color: white" data-darkreader-inline-stroke=""></path> </g> </g></svg>
    Add Set
  </button>
</div>
{/if}

<script lang="ts">
  import { onMount } from "svelte";
  import InputNumber from "./InputNumber.svelte";
  import { wm } from './../shared/store/settingsStore';
  import type { WeightMetrics } from "../shared/enum/WeightMetrics";
  import { Weight } from "../shared/class/Weight";

  import { Exercice } from "../shared/class/Exercice";
  import { Set } from "../shared/class/Set";

  import Hammer from 'hammerjs';

  // import store
  let weightMetric: WeightMetrics;
  $: { weightMetric = $wm; }

  // defining values

  let isMounted: boolean = false;

  /** Exercice that must be passed in argument. */
  export let exercice: Exercice;

  onMount(() => {
    isMounted = true;
  })

  function addSet(): void {
    let lastWeight: Weight = new Weight(0, weightMetric);
    if (exercice.sets && exercice.sets.length > 0) lastWeight.weight = exercice.sets[exercice.sets.length-1].weight.weight;
    exercice.sets.push(new Set(exercice.sets.length, 0, lastWeight, true));
    exercice.sets = exercice.sets;
  }

  // variables linked to the setHammer function but must be global to the component
  let lastDeltaX = 0;
  const threshold = 100;
  let h;
  function setHammer(set: Set): void {
    console.log(set);
    
    h = new Hammer(set.e)

    // // add a "PAN" recognizer to it (all directions)
    // h.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 }) );

    // tie in the handler that will be called
    h.on("pan", (e) => {
      const deltaX = e.deltaX - lastDeltaX;

      set.e.style.transform = `translateX(${deltaX}px)`;

      if (deltaX > threshold) {
        deleteIconVisible = true;
      } else {
        deleteIconVisible = false;
      }
    });

    // TODO : Superimpose divs with one with gradient and delete icon and make it dynamic when swiping
    // TODO : Implement deletion by making the div go away in style with a fading
    h.on('panend', () => {
      console.log("panend");
      
      if (lastDeltaX > threshold) {
        // Perform action when swipe threshold is reached
        console.log('Swiped successfully');
      }

      /** Duration of the ease-out effect in ms.*/
      const duration = 300;
      set.e.style.transition = `transform ${duration}ms ease-out`;
      set.e.style.transform = `translateX(0px)`;
      deleteIconVisible = false;

      setTimeout(() => {
        set.e.style.transition = '';
        deleteIconVisible = false;
      }, duration);
    });

  }

  function deleteSet(set: Set): void {
    console.log("deleteSet");
    for (let i = 0; i < exercice.sets.length; i++) {
      if (exercice.sets[i] === set) {
        exercice.sets.splice(i,1);
        exercice.sets = exercice.sets;
        return;
      }
    }
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