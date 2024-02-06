<script lang="ts">
  import ActivityList from "../lib/Activity/ActivityList.svelte";
  import type { Activity } from "../shared/class/Activity/Activity";
  import { getActivitiesFromDatabase } from "../shared/functions/Database";

  let activities: Activity[] = null;
  type TabType = "list" | "graph";
  let selectedTab: TabType = "list";

  const tabs = {
    list: {
      class: "tab-active",
    },
    graph: {
      class: "",
    },
  };

  setActivities();

  async function setActivities() {
    activities = await getActivitiesFromDatabase();
  }

  function setTabs(activeTab: TabType) {
    for (const key of Object.keys(tabs)) {
      if (activeTab == key) tabs[key].class = "tab-active";
      else tabs[key].class = "";
    }
  }
</script>

<div role="tablist" class="tabs tabs-boxed">
  <a role="tab" class="tab {tabs.list.class}" on:click={() => setTabs("list")}
    >List</a
  >
  <a role="tab" class="tab {tabs.graph.class}" on:click={() => setTabs("graph")}
    >Graphs</a
  >
</div>

<div class="mt-4">
  {#if tabs.list.class == "tab-active"}
    <ActivityList {activities} on:refreshActivities={() => setActivities()} />
  {:else if tabs.graph.class == "tab-active"}
    <!-- <ActivityGraph on:refresh={() => setActivities()} /> -->
  {:else}
    <div class="text-red-100">ERROR WRONG TAB SELECTED : {selectedTab}</div>
  {/if}
</div>
