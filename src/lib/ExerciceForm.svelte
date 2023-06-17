{#if isMounted && exercice && exercice.sets}
{#each exercice.sets as set, i}
<!-- id="{createElementId(componentName, `${exercice.name}-${mdKey}`, set.rank)}" -->
<div class="collapse bg-base-300 mb-1" id="{createElementId(componentName, `${exercice.name}-${mdKey}`, set.id)}" >
  <div class="absolute bg-red-400 z-0 w-full h-full opacity-0 flex justify-center items-center" id="{createElementId(componentName, `${exercice.name}-${ddKey}`, set.id)}">
    <Icon icon={trashCanOutline} color="white" width="30" height="30"/>
  </div>
  <input type="checkbox" checked={set.isOpen} class="override-collapse-title"/> 
  <div class="collapse-title font-medium bg-base-200 override-collapse-title cursor-pointer">
      {`Set ${i+1}`}
  </div>
  <div class="collapse-content bg-base-200 override-collapse-content z-10">
    <div class="flex justify-between items-center">
      <div class="flex flex-row items-center">
        <InputNumber placeholder="Weight" className="input w-24 mr-0 text-left" metric={set.weight.metric} value={set.weight.weight}/>
        <span class="font-bold mx-2">X</span>
        <InputNumber placeholder="Reps" className="input w-14 ml-0 text-center" value={set.repetitions}/>
      </div>
      <button class="btn btn-ghost btn-xs" on:click={() => {setToBeDeleted = set; showDeleteDialog(set, true)}}>
        <Icon icon={trashCanOutline} color="red" width="15" height="15" class="cursor-pointer" />
      </button>
    </div>
  </div>
</div>
{/each}

<div class="flex justify-center w-full mt-2">
  <button class="btn btn-primary w-4/5 override-addExerciceButton" on:click={addSet} >
    <Icon icon={plusIcon} color="white" width="30" height="30"/>
    Add Set
  </button>
</div>
{/if}


<dialog id="modal" class="modal" bind:this={deleteDialog}>
  <form method="dialog" class="modal-box">
    <div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-lg mb-10">Delete Set ?</h3>
      <button class="btn btn-error" on:click={() => deleteSet(setToBeDeleted)}>CONFIRM</button>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<script lang="ts">
  import { onMount } from "svelte";
  
  import { wm } from './../shared/store/settingsStore';
  import type { WeightMetrics } from "../shared/enum/WeightMetrics";
  
  import InputNumber from "./InputNumber.svelte";
  
  import { Weight } from "../shared/class/Weight";
  import { Exercice } from "../shared/class/Exercice";
  import { Set } from "../shared/class/Set";
  import { createElementId } from "../shared/functions/Utilitary";

  // imported icons
  import Icon from '@iconify/svelte';
  import trashCanOutline from '@iconify/icons-mdi/trash-can-outline';
  import plusIcon from '@iconify/icons-mdi/plus';


  // CONST
  const componentName: string = "ExerciceForm";
  /** Id for identifying all the divs that contains a single Set object*/
  const mdKey: string = `setDiv`;
  /** Id for identifying all the divs that are the superimposed div used for the delete animation for the Set div. */
  const ddKey: string = `setDeleteDiv`;

  // import store
  let weightMetric: WeightMetrics;
  $: { weightMetric = $wm; }

  // defining values
  let isMounted: boolean = false;
  let deleteDialog: HTMLElement;
  let setToBeDeleted: Set = null;

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

  function deleteSet(set: Set): void {
    console.log(set);
    
    if (!set) throw new Error("There is no set to be deleted !");
    
    for (let i = 0; i < exercice.sets.length; i++) {
      if (exercice.sets[i] === set) {
        exercice.sets.splice(i,1);
        exercice.sets = exercice.sets;
        return;
      }
    }
  }

  /** Show the dialog for trying to delete a set. */
	function showDeleteDialog(set: Set, asModal = true): void {
    setToBeDeleted = set;
    try {
			deleteDialog[asModal ? 'showModal' : 'show']();
		} catch(e) {
      throw new Error(e);
    }
	};


  
  // // variables linked to the setHammer function but must be global to the component
  // let dragging: boolean = false;
  // let h: Hammer;
  // let deltaX: number = 0;
  // const threshold = 200;
  // const duration = 300;
  // function setHammer(i: number): void {
  //   console.log(`setHammer : ${i}`);
    
  //   dragging = true;
  //   // let set: Set = exercice.sets[i];

  //   const mainDiv = document.getElementById(createElementId(componentName, `${exercice.name}-${mdKey}`, i));
  //   const deleteDiv = document.getElementById(createElementId(componentName, `${exercice.name}-${ddKey}`, i));

  //   h = new Hammer(mainDiv)

  //   // // add a "PAN" recognizer to it (all directions)
  //   // h.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 }) );

  //   // tie in the handler that will be called
  //   h.on("pan", (e) => {
  //     deltaX = e.deltaX;

  //     mainDiv.style.transform = `translateX(${deltaX}px)`;
      
  //     deleteDiv.style.zIndex = '20';
      
  //     let opacity = 100;
  //     if (Math.abs(deltaX) <= threshold) {
  //       opacity = Math.abs(deltaX) / threshold * 100;
  //     }
      
  //     deleteDiv.style.opacity = `${opacity}%`;

  //   });

  //   // TODO : Superimpose divs with one with gradient and delete icon and make it dynamic when swiping
  //   // TODO : Implement deletion by making the div go away in style with a fading
  //   h.on('panend', () => {
  //     if (!dragging) return;
      
  //     mainDiv.style.transition = `transform ${duration}ms ease-in-out`;
      
  //     console.log(deltaX);
  //     if (Math.abs(deltaX) >= threshold) {
  //       // allow to do the style change asynchrosely and make it work for some reason
  //       setTimeout(() => {
  //         mainDiv.style.transform = `translateX(${deltaX * 5}px)`;
  //         setTimeout(() => {
  //           console.log(i);
  //           const index: number = exercice.sets.findIndex((s) => s.id != i);
  //           exercice.sets.splice(index,1);
  //           mainDiv.remove();
  //           console.log(exercice.sets);
            
  //         }, duration);
  //       }, 0);
  //     }

  //     else {
  //       // allow to do the style change asynchrosely and make it work for some reason
  //       setTimeout(() => {
  //         mainDiv.style.transform = `translateX(0px)`;
  //         setTimeout(() => {
  //           mainDiv.style.transition = '';
  //           deleteDiv.style.zIndex = '0';
  //           deleteDiv.style.opacity = '0%';
  //         }, duration);
  //       }, 0);
  //     }
      
  //     dragging = false;
  //   });

  // }
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