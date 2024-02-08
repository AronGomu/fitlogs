<script lang="ts">
  import ActivityGraph from "../lib/Activity/ActivityGraph.svelte";
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
    activities.sort((a: Activity, b: Activity) => {
      if (!a && b) return -1;
      if (a && !b) return 1;
      if (!a && !b) return 0;

      let total: number = 0;
      console.log(`${a.printDate()}\n${b.printDate()}`);

      total = a.year - b.year;
      if (total !== 0) return -total;
      console.log(`total year : ${total}`);

      total = a.month - b.month;
      if (total !== 0) return -total;
      console.log(`total month : ${total}`);

      total = a.day - b.day;
      console.log(`total day : ${total}`);
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
  <a role="tab" class="tab {tabs.list.class}" on:click={() => setTabs("list")}
    >List</a
  >
  <a role="tab" class="tab {tabs.graph.class}" on:click={() => setTabs("graph")}
    >Graphs</a
  >
</div>

<div class="w-full h-full mt-4">
  {#if tabs.list.class == "tab-active"}
    <ActivityList {activities} on:refreshActivities={() => setActivities()} />
  {:else if tabs.graph.class == "tab-active"}
    <ActivityGraph {activities} />
  {:else}
    <div class="text-red-100">ERROR WRONG TAB SELECTED : {selectedTab}</div>
  {/if}
</div>
