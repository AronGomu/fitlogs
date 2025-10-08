<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import InputNumber from '../WorkoutForm/inputs/InputNumber.svelte';
    import DateInput from '../DateInput.svelte';
    import { Activity } from '../../shared/class/Activity/Activity';
    import { deleteActivityFromDatabase, insertOrUpdateActivityInDatabase } from '../../shared/database/ActivityDatabase';
    import { formatDateToYYYYMMDDNumber, getYesterday } from '../../shared/functions/utils';
    import type { Settings } from '../../shared/class/Settings';
    const dispatch = createEventDispatcher();

    
    export let activityList: Activity[] = [];
    export let settings: Settings;
    export let todayOrYesterday: number = formatDateToYYYYMMDDNumber(new Date());
    let dateForm: Date = new Date();
    let activityForm = new Activity(todayOrYesterday, 0, 0, 0);

    // UI Stuff
    let isOverridingExistingActivity: boolean = false;
    let doesActivityAlreadyExist: boolean = false;
    let isYesterdayFlag = false;
    let isActivityValid: boolean = false;


    /// init /// 
    // initAsync(todayOrYesterday, activityForm)
    getActivityFromList(activityList, todayOrYesterday, activityForm);
    /// init ///


    async function getActivityFromList(activityList: Activity[], date, activityForm) {
        const activity = activityList.find(a => a.date === date)

        if (activity) {
            activityForm = activity;
            isOverridingExistingActivity = true;
        } else isOverridingExistingActivity = false;
    }

    function updateIsYesterdayFlag(dateForm) {
        if (dateForm === formatDateToYYYYMMDDNumber(getYesterday())) isYesterdayFlag = true;
        else isYesterdayFlag = false;
    }

    async function saveActivity(activityForm) {
        await insertOrUpdateActivityInDatabase(activityForm);
        // dispatch('updateActivityList');
    }

    async function deleteActivity(activityForm) {
        const activity = await deleteActivityFromDatabase(activityForm.date);
        // dispatch('updateActivityList');
    }

    function updateDateForm(activityList, dateForm, activityForm) {
        const date = formatDateToYYYYMMDDNumber(dateForm);
        activityForm.date = date;
        updateIsYesterdayFlag(dateForm);
        getActivityFromList(activityList, date, activityForm)
    }
</script>

<div class="flex flex-col items-center">
    <DateInput bind:date={dateForm} on:input={
        e => updateDateForm(activityList, e.detail, activityForm)
    } />

    <div class="mt-2">
        <InputNumber label="Weight" placeholder="Weight" className="input w-24  text-left"
            value={activityForm.weight} metric={settings.wm} 
            on:input={e =>  activityForm.weight = e.detail.value}
        />
    </div>

    <div class="mt-2">
        <InputNumber label="Calories" placeholder="Calories" className="input w-24 mt-2 text-left"
        value={activityForm.calories}
            on:input={e => activityForm.calories = e.detail.value}
        />
    </div>

    <div class="mt-2">
        <InputNumber label="Steps" placeholder="Steps" className="input w-24 mt-2 text-left" value={activityForm.steps}
            on:input={e => activityForm.steps = e.detail.value}
        />
    </div>

    {#if doesActivityAlreadyExist}
        <button class="btn btn-warning mt-2" disabled={isActivityValid}
            on:click={() => saveActivity(activityForm)}
        > Update Activity </button>
        <button class="btn btn-error mt-2" on:click={() => deleteActivity(activityForm)} >Delete Activity</button>

    {:else if isYesterdayFlag}
        <button class="btn btn-success mt-2" disabled={isActivityValid} 
            on:click={() => saveActivity(activityForm)}
        > Log Yesterday's Activity </button>

    {:else}
        <button class="btn btn-warning mt-2" disabled={isActivityValid}
            on:click={() => saveActivity(activityForm)}
        > Log Activity </button>

    {/if}


    {#if isOverridingExistingActivity}
        <div class="text-warning">
            <span>You are overriding existing data.</span>
        </div>
    {/if}
</div>
