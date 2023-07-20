<script lang="ts">
import trashCanOutline from "@iconify/icons-mdi/trash-can-outline";
import Icon from "@iconify/svelte";
import LiftForm from "../lib/LiftForm/LiftForm.svelte";
import { Lift } from "../shared/class/Lift";
import { MuscleWork } from "../shared/class/MuscleWork";
import { lifts } from "../shared/store/liftStore";
import { StoreName, deleteFromDatabase } from "../shared/functions/Database";

// TODO : Implements deletion, addition, edition and detail page for exercices. Probably creating another page that is a form or putting at the bottom of the page, idk, we'll see
// TODO2 : Replace the exercice name from Exercice clas with a Lift object

// Store variables
/** All the exercices stored that can be shown as suggestions. */
var ll: Lift[] = [];
lifts.subscribe(lifts => { ll = lifts; console.log(ll);
});

/** New Lift object that will be modified then added to the database. */
var nl: Lift = new Lift();
nl.targets.push(new MuscleWork(null, 0));
</script>


<div>
  {#if nl}
  <LiftForm lift={nl} on:liftAdded={event => {
    lifts.update(toUpdate => {
        toUpdate.push(event.detail);
        return toUpdate;
    });
    nl = null;
  }} />
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
            {#each ll as l, i}
            <tr>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <td class="font-bold" on:click={() => {console.log(l);}}>{l.name}</td>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <td on:click={() => {console.log(l);}}>{l.variation}</td>
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
                    <button on:click={() => {
                      console.log("DELETE");
                      
                      deleteFromDatabase(StoreName.LIFT, l.id).then(() => {
                        ll.splice(i, 1);
                        ll = ll;
                      }) 
                    }}>
                      <Icon icon={trashCanOutline} color="red" width="15" height="15" class="cursor-pointer" />
                    </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
</div>