<script lang="ts">
    import ActivityForm from '../lib/Activity/ActivityForm.svelte';
    import type { Activity } from '../shared/class/Activity/Activity';
    import {
        activityAverageListWritable,
        activityNormalListWritable,
        updateActivityListWritable,
    } from '../shared/store/activityStore';
    import ActivityRangeSelector from '../lib/Activity/ActivityRangeSelector.svelte';
    import type { Settings as Settings } from '../shared/class/Settings';
    import { formatDateToYYYYMMDDNumber, getDateFromYYYYMMDDNumber } from '../shared/functions/UtilsDate';
    import { settingsWritable } from '../shared/store/settingsStore';
    import { saveSettings } from '../shared/database/SettingsDatabase';
    import { pageTitleWritable } from '../shared/store/pageTitleStore';

    let settings: Settings;

    let isLoadingActivityNormalList: boolean = true;
    let isLoadingActivityAverageList: boolean = true;
    let activityNormalListLoaded: Activity[] = [];
    let activityAverageListLoaded: Activity[] = [];
    let activityListToShow: Activity[] = [];
    let dateSelected: Date = null;

    const today = formatDateToYYYYMMDDNumber(new Date());
    const yesterday = formatDateToYYYYMMDDNumber(new Date(new Date().getDate() - 1));


    // init //
    pageTitleWritable.set("Activity List");
    settingsWritable.subscribe((s: Settings) => {
        if (!s) return;
        settings = s;
        subscribeForActivityList(s);
        subscribeForActivityAverageList(s);
    });
    // init //

    function subscribeForActivityList(s: Settings) {
        activityNormalListWritable.subscribe((activityNormalList) => {
            activityNormalListLoaded = activityNormalList;
            setActivityListToShow(s);
            isLoadingActivityNormalList = false;
        });
    }

    function subscribeForActivityAverageList(s: Settings) {
        activityAverageListWritable.subscribe((activityAverageList) => {
            activityAverageListLoaded = activityAverageList;
            setActivityListToShow(s);
            isLoadingActivityAverageList = false;
        });
    }

    function setActivityListToShow(s: Settings) {
        if (s.typeActivityList === 'normal') activityListToShow = activityNormalListLoaded;
        else if (s.typeActivityList === 'average') activityListToShow = activityAverageListLoaded;
    }

    async function updateActivityListShowed(s: Settings, nbDaysToShow: number) {
        s.nbDayShow = nbDaysToShow;
        saveSettings(s);
        isLoadingActivityNormalList = false;
        await updateActivityListWritable(s);
        isLoadingActivityNormalList = false;
    }

    function swapToAverageActivityList() {
        activityListToShow = activityAverageListLoaded;
    }

    function swapToNormalActivityList() {
        activityListToShow = activityNormalListLoaded;
    }

    // UI Stuff //
    let activityFormDialog: HTMLElement;
    function showActivityFormDialog(yyyymmdd: number, asModal = true) {
        dateSelected = getDateFromYYYYMMDDNumber(yyyymmdd);
        try { activityFormDialog[asModal ? 'showModal' : 'hide'](); } 
        catch (e) { throw new Error(e); }
    }
    function hideActivityFormDialog() {
        /* @ts-ignore */
        try { activityFormDialog.close(); } 
        // try { activityFormDialog.hidden = true; } 
        catch (e) { console.error("Failed to close dialog:", e); }
    }

    
</script>

<div class="h-full w-full flex flex-col justify-between">

    <div class="flex-1 w-full flex flex-col">

        <div class="h-full overflow-y-auto">
            
            {#if !isLoadingActivityNormalList && activityListToShow && activityListToShow.length > 0 && settings}
                <ActivityRangeSelector nbDayShow={settings.nbDayShow}
                    on:click={(e) => updateActivityListShowed(settings, e.detail.value)}
                />

                <div class="h-0 w-full flex flex-col">
                    <table class="table table-zebra table-pin-row table-lg">
                        <thead>
                            <tr>
                                <th><span class="font-bold">Date</span></th>
                                <th><span class="font-bold">Weight</span></th>
                                <th><span class="font-bold">Calories</span></th>
                                <th><span class="font-bold">Steps</span></th>
                            </tr>
                        </thead>

                        <tbody>
                            {#each activityListToShow as a}
                                <tr class="cursor-pointer" on:click={() => showActivityFormDialog(a.date)}>
                                    <td>{a.printDateSlash()}</td>
                                    <td>{a.weight}</td>
                                    <td>{a.calories}</td>
                                    <td>{a.steps}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {:else if isLoadingActivityNormalList }
                <div class="flex items-center justify-center">
                    <span class="h-full w-full loading loading-spinner loading-xl"></span>
                </div>
            {:else if !settings}
                <div class="h-full w-full flex items-center justify-center">No Settings !</div>
            {:else}
                <div class="h-full w-full flex items-center justify-center">No Activities !</div>
            {/if}
        </div>
    </div>

    <div class="flex  m-4 justify-around">
        <button class="btn btn-primary" on:click={() => showActivityFormDialog(today)}>
                Log Activity
        </button>
        {#if activityListToShow == activityNormalListLoaded}
             <button class="btn btn-secondary" on:click={() => swapToAverageActivityList()}>
                Show Average
             </button>
        {:else }
            <button class="btn btn-secondary" on:click={() => swapToNormalActivityList()}>
                Show Normal
             </button>
        {/if}
    </div>

    
</div>

<dialog id="modal" class="modal" bind:this={activityFormDialog}>
    <form method="dialog" class="modal-box">
        <ActivityForm dateForm={dateSelected} activityList={activityNormalListLoaded} {settings} 
            on:close={() => hideActivityFormDialog()}
        />
    </form>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
