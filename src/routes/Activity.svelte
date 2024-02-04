<script lang="ts">
  import ActivityForm from "../lib/WorkoutForm/ActivityForm/ActivityForm.svelte";
  import type { Activity } from "../shared/class/Activity/Activity";
  import { getActivitiesFromDatabase } from "../shared/functions/Database";

  let activities: Activity[] = null;

  // UI Stuff
  let activityFormDialog: HTMLElement;
  function showActivityFormDialog(asModal = true) {
    try {
      activityFormDialog[asModal ? "showModal" : "show"]();
    } catch (e) {
      throw new Error(e);
    }
  }

  setActivities();

  async function setActivities() {
    activities = await getActivitiesFromDatabase();
  }
</script>

<button class="btn btn-primary" on:click={() => showActivityFormDialog()}
  >Log Activity</button
>

{#if activities}
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex-1 overflow-y-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <span class="font-bold">Date</span>
            </th>
            <th>
              <span class="font-bold">Weight</span>
            </th>
            <th>
              <span class="font-bold">Calories</span>
            </th>
            <th>
              <span class="font-bold">Steps</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each activities as a}
            <tr>
              <td>{a.year}-{a.month}-{a.day}</td>
              <td>{a.weight}</td>
              <td>{a.calories}</td>
              <td>{a.steps}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <!-- content here -->
{/if}

<dialog id="modal" class="modal" bind:this={activityFormDialog}>
  <form method="dialog" class="modal-box">
    <ActivityForm />
  </form>
  <form method="dialog" class="modal-backdrop">
    <button
      on:click={() => {
        setActivities();
      }}>close</button
    >
  </form>
</dialog>
