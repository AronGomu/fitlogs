<script lang="ts">
  import ActivityList from "../lib/Activity/ActivityList.svelte";
  import ActivityPlan from "../lib/Activity/ActivityPlan.svelte";
  import ActivityStats from "../lib/Activity/ActivityStats.svelte";
  import type { Activity, Activity } from "../shared/class/Activity/Activity";
  import { exportActivities } from "../shared/functions/Activity";
  import { getActivitiesFromDatabase } from "../shared/functions/Database";

  let activities: Activity[] = null;
  type TabType = "plan" | "list" | "stats";
  let selectedTab: TabType = "plan";

  const tabs = {
    plan: {
      class: "tab-active",
    },
    list: {
      class: "",
    },
    stats: {
      class: "",
    },
  };

  setActivities();

  async function setActivities() {
    activities = await getActivitiesFromDatabase();
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
</script>

<div role="tablist" class="tabs tabs-boxed">
  <button
    role="tab"
    class="tab {tabs.plan.class}"
    on:click={() => setTabs("plan")}>Plan</button
  >
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
</div>

<div class="w-full h-full mt-4">
  {#if tabs.plan.class == "tab-active"}
    <ActivityPlan />
  {:else if tabs.list.class == "tab-active"}
    <ActivityList {activities} on:refreshActivities={() => setActivities()} />
  {:else if tabs.stats.class == "tab-active"}
    <ActivityStats {activities} />
  {:else}
    <div class="text-red-100">ERROR WRONG TAB SELECTED : {selectedTab}</div>
  {/if}
</div>

<div></div>
