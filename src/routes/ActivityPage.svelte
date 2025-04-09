<script lang="ts">
  import { onMount } from "svelte";
  import ActivityList from "../lib/Activity/ActivityList.svelte";
  import ActivityPlan from "../lib/Activity/ActivityPlan.svelte";
  import ActivityStats from "../lib/Activity/ActivityStats.svelte";
  import type { Activity } from "../shared/class/Activity/Activity";
  import { getActivitiesFromDatabase } from "../shared/functions/Database";
  import { navigate } from "svelte-routing";

  let activities: Activity[] = null;
  type TabType = "list" | "stats" | "plan";
  let selectedTab: TabType = "list";

  const tabs = {
    list: { class: "tab-active" },
    stats: { class: "" },
    plan: { class: "" },
  };

  setActivities();

  async function setActivities() {
    activities = await getActivitiesFromDatabase();
    if (!activities) {
      console.error("activities is null");
      return;
    }
    activities.sort((a: Activity, b: Activity) => {
      if (!a && b) return -1;
      if (a && !b) return 1;
      if (!a && !b) return 0;

      let total: number = 0;

      total = a.year - b.year;
      if (total !== 0) return -total;

      total = a.month - b.month;
      if (total !== 0) return -total;

      total = a.day - b.day;
      return -total;
    });
  }

  function setTabs(activeTab: TabType) {
    for (const key of Object.keys(tabs)) {
      if (activeTab == key) tabs[key].class = "tab-active";
      else tabs[key].class = "";
    }
  }

  async function gotoMenu() {
    navigate("/fitlogs/");
  }
</script>

<div role="tablist" class="tabs tabs-boxed">
  <button
    role="tab"
    class="tab {tabs.list.class}"
    on:click={() => setTabs("list")}>List</button
  >
  <button
    role="tab"
    class="tab {tabs.stats.class}"
    on:click={() => setTabs("stats")}>Stats</button
  >
  <button
    role="tab"
    class="tab {tabs.plan.class}"
    on:click={() => setTabs("plan")}>Plan</button
  >
</div>
{#if activities}
  <div class="w-max-full h-max-full mt-4">
    {#if tabs.plan.class == "tab-active"}
      <ActivityPlan {activities} />
    {:else if tabs.list.class == "tab-active"}
      <ActivityList {activities} on:refreshActivities={() => setActivities()} />
    {:else if tabs.stats.class == "tab-active"}
      <ActivityStats {activities} />
    {:else}
      <div class="text-red-100">ERROR WRONG TAB SELECTED : {selectedTab}</div>
    {/if}
  </div>
{/if}

<div class="flex justify-center">
  <button class="btn btn-warning w-30 m-10" on:click={() => {navigate("/fitlogs/");}}>Back To Menu</button>
</div>