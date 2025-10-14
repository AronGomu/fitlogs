<script lang="ts">
    import { navigate } from "svelte-routing";
    import { Settings } from "../../shared/class/Settings";

    type TabType = "list" | "stats" | "plan" | "";
    export let selectedTab: TabType = "list";

    const tabs  = {
        list: { class: "" as TabType},
        stats: { class: "" as TabType},
        plan: { class: "" as TabType},
    };

    // init //
    for (const key of Object.keys(tabs)) {
        if (selectedTab === key) tabs[key].class = "tab-active";
    }
    // init //
</script>

<div role="tablist" class="w-full tabs tabs-lift tabs-xl">
  <button role="tab" class="tab {tabs.list.class}" on:click={() => navigate("/fitlogs/activity/list")}>
    List
  </button>

    <button role="tab" class="tab {tabs.stats.class}" on:click={() => navigate("/fitlogs/activity/stats")}>
        Stats
    </button>

  <!-- Paying option -->
  <!-- <button role="tab" class="tab {tabs.plan.class}" on:click={() => navigate("/fitlogs/activity/plan")}>
    Plan
  </button> -->
</div>