<script lang="ts">
import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
import Icon from "@iconify/svelte";
import { Lift } from "../shared/class/Lift";
import { Muscle } from "../shared/enum/Muscle";
import { enumToList } from "../shared/functions/Utilitary";
import { exerciceSuggestions as lifts } from "../shared/store/suggestionsStore";
  import { MuscleWork } from "../shared/class/MuscleWork";
  import { isPercentage, minLength } from "../shared/functions/Form";
  import { StoreName, addToDatabase } from "../shared/functions/Database";

// TODO : Implements deletion, addition, edition and detail page for exercices. Probably creating another page that is a form or putting at the bottom of the page, idk, we'll see
// TODO2 : Replace the exercice name from Exercice clas with a Lift object

// Store variables
/** All the exercices stored that can be shown as suggestions. */
var ll: Lift[] = [];
lifts.subscribe(lifts => {
    ll = lifts
});

/** New Lift object that will be modified then added to the database. */
var nl: Lift = new Lift();
nl.targets.push(new MuscleWork(null, 0));

function exerciceIsValid(): boolean {
  // TODO : Make this function called on each input within the form.
  
  if (!minLength(nl.name, 3)) return false;
  if (!minLength(nl.variation, 3)) return false;
  if (!minLength(nl.targets, 1)) return false;
  let totalPercentage: number = 0;
  for (const t of nl.targets) {
    if (!t.muscle) return false;
    if (!t.work) return false;
    if (!isPercentage(t.work)) return false;
    totalPercentage += t.work;
  }

  if (totalPercentage !== 100) return false;

  return true;
}

</script>

<div>
  {#if nl}
  <div class="flex flex-col justify-center">
    <input type="text" class="m-2 input input-bordered input-primary" bind:value={nl.name} placeholder="Main name of the lift...">
    <input type="text" class="m-2 input input-bordered input-secondary" bind:value={nl.variation} placeholder="Name of the variation of lift...">
    {#each nl.targets as t, i}
    <div class="flex flex-row items-center justify-between">
      
      <select class="m-2 select select-bordered w-3/5 max-w-xs" bind:value={t.muscle}>
        <option disabled selected>Select Muscle</option>
        {#each enumToList(Muscle) as muscle}
        <option value="{muscle}">{muscle}</option>
        {/each}
      </select>

      <div class="m-2 relative w-24">
        <input type="number" class="input input-bordered w-full" bind:value={t.work}/>
        <div class="absolute top-0 right-0 bottom-0 left-1/2 bg-base-200 ml-0 rounded-r-lg px-2 flex items-center">%</div>
      </div>

      <button on:click={() => { nl.targets.splice(i,1); nl.targets = nl.targets;}}>
        <Icon icon={trashCanOutline} color="red" width="15" height="15" class="cursor-pointer"/>
      </button>
      
    </div>
    {/each}

    <div class="flex justify-center">
      <button class="btn btn-secondary btn-sm" on:click={() => {
        console.log(nl.targets);
        nl.targets.push(new MuscleWork(null, 0));
        nl.targets = nl.targets;
      }} >Add Muscle</button>
    </div>

    <div class="m-4 flex justify-center">
      {#if exerciceIsValid()}
      <button class="btn btn-primary" on:click={() => {
        addToDatabase(StoreName.LIFT, nl).then(l => {
          lifts.update(toUpdate => {
            toUpdate.push(l);
            return toUpdate;
          });
          nl = null;
        })
      }}>Add Exercice</button>
      {:else}
      <button class="btn btn-disabled">Add Exercice DISABLED</button>
      {/if}
    </div>
  </div>
  {:else}
  <div class="m-4 flex justify-center">
    <button class="btn btn-primary" on:click={() => {
      nl = new Lift();
      nl.targets = [new MuscleWork(null, 0)]
    }}>
      New Exercice
    </button>
  </div>
  {/if}
</div>

<div class="flex flex-col">
    <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Name</th>
              <th>Variation</th>
              <!-- <th>Muscles Targeted</th> -->
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#each ll as l}
            <tr>
                <td class="font-bold">{l.name}</td>
                <td>{l.variation}</td>
                <!-- <td>
                    {#each l.targets as mw, i}
                    
                    {#if l.targets[i] !== last(l.targets)}
                    <span>{`${mw.work}% `}</span>
                    <span class="font-bold">{`${mw.muscle}, `}</span>
                    {:else}
                    <span>{`${mw.work}% `}</span>
                    <span class="font-bold">{`${mw.muscle}`}</span>
                    {/if}
                    {/each}
                </td> -->
                <td>
                    <!-- svelte-ignore missing-declaration -->
                    <Icon icon={trashCanOutline} color="red" width="15" height="15" class="cursor-pointer" />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
</div>