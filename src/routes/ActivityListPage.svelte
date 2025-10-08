<script lang="ts">
    import ActivityForm from '../lib/Activity/ActivityForm.svelte';
    import ActivityHeader from '../lib/Activity/ActivityHeader.svelte';
    import ActivityFooter from '../lib/Activity/ActivityFooter.svelte';
    import type { Activity } from '../shared/class/Activity/Activity';
    import {
        activityAverageListWritable,
        activityListWritable as activityNormalListWritable,
        updateActivityListWritable,
    } from '../shared/store/activityStore';
    import ActivityRangeSelector from '../lib/Activity/ActivityRangeSelector.svelte';
    import type { Settings as Settings } from '../shared/class/Settings';
    import { saveSettings, settingsWritable } from '../shared/store/settingsStore';
    import { formatDateToYYYYMMDDNumber } from '../shared/functions/utils';

    let settings: Settings;

    let isLoadingActivityNormalList: boolean = true;
    let isLoadingActivityAverageList: boolean = true;
    let activityNormalListLoaded: Activity[] = [];
    let activityAverageListLoaded: Activity[] = [];
    let activityListToShow: Activity[] = [];

    const today = formatDateToYYYYMMDDNumber(new Date());
    const yesterday = formatDateToYYYYMMDDNumber(new Date(new Date().getDate() - 1));

    // init //
    settingsWritable.subscribe((s) => {
        settings = s;
        subscribeForActivityList();
        subscribeForActivityAverageList();
    });
    // init //

    function subscribeForActivityList() {
        activityNormalListWritable.subscribe((activityNormalList) => {
            activityNormalListLoaded = activityNormalList;
            setActivityListToShow();
            isLoadingActivityNormalList = false;
        });
    }

    function subscribeForActivityAverageList() {
        activityAverageListWritable.subscribe((activityAverageList) => {
            activityAverageListLoaded = activityAverageList;
            setActivityListToShow();
            isLoadingActivityAverageList = false;
        });
    }

    function setActivityListToShow() {
        if (settings.typeActivityList === 'normal') activityListToShow = activityNormalListLoaded;
        // if (settings.typeActivityList === 'normal') activityListToShow = activityAverageListLoaded;
        else if (settings.typeActivityList === 'average') activityListToShow = activityAverageListLoaded;
    }

    async function updateActivityListShowed(nbDaysToShow: number) {
        settings.nbDayShow = nbDaysToShow;
        saveSettings(settings);
        isLoadingActivityNormalList = false;
        await updateActivityListWritable(settings);
        isLoadingActivityNormalList = false;
    }

    // UI Stuff //
    let activityFormDialog: HTMLElement;
    function showActivityFormDialog(date, asModal = true) {
        try {
            activityFormDialog[asModal ? 'showModal' : 'show']();
        } catch (e) {
            throw new Error(e);
        }
    }
</script>

<div class="h-full w-full flex flex-col justify-between">
    <div class="flex-1 w-full flex flex-col">
        <ActivityHeader selectedTab="list" />

        <div class="h-full overflow-y-auto">
            <div class="w-full flex items-center justify-center mb-2">
                <button class="btn btn-primary" on:click={() => showActivityFormDialog(today)}>
                    Log Today's weigth
                </button>

                <button class="btn btn-secondary" on:click={() => showActivityFormDialog(yesterday)}>
                    Log Yesterday's Activity
                </button>
            </div>

            {#if !isLoadingActivityNormalList && activityNormalListLoaded}
                <ActivityRangeSelector
                    nbDaysToShow={settings.nbDayShow}
                    on:click={(e) => updateActivityListShowed(e.detail.value)}
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
                                    <td>{a.printDate()}</td>
                                    <td>{a.weight}</td>
                                    <td>{a.calories}</td>
                                    <td>{a.steps}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {:else}
                <div class="flex items-center justify-center">
                    <span class="loading loading-spinner loading-xl"></span>
                </div>
            {/if}
        </div>
    </div>

    <ActivityFooter />
</div>

<dialog id="modal" class="modal" bind:this={activityFormDialog}>
    <form method="dialog" class="modal-box">
        <ActivityForm activityList={activityListToShow} {settings} />
    </form>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
