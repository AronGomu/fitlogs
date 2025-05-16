<script lang="ts">
    import { navigate } from "svelte-routing";

    const tabs  = {
        list: { class: "" as TabType},
        stats: { class: "" as TabType},
        plan: { class: "" as TabType},
    };

    type TabType = "list" | "stats" | "plan" | "";
    export let selectedTab: TabType = "list";

    init();

    function init(): void {
        for (const key of Object.keys(tabs)) {
            if (selectedTab === key) tabs[key].class = "tab-active";
        }
    }
</script>

<div role="tablist" class="tabs tabs-boxed mb-2">
  <button role="tab" class="tab {tabs.list.class}" on:click={() => navigate("/fitlogs/activity/list")}>
    List
  </button>

  <button role="tab" class="tab {tabs.stats.class}" on:click={() => navigate("/fitlogs/activity/stats")}>
    Stats
  </button>

  <button role="tab" class="tab {tabs.plan.class}" on:click={() => navigate("/fitlogs/activity/plan")}>
    Plan
  </button>
</div>