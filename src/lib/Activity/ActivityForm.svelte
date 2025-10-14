<script lang="ts">
    import InputNumber from '../WorkoutForm/inputs/InputNumber.svelte';
    import DateInput from '../DateInput.svelte';
    import { Activity, buildActivityWithDate } from '../../shared/class/Activity/Activity';
    import { deleteActivityFromDatabase, insertOrUpdateActivityInDatabase } from '../../shared/database/ActivityDatabase';
    import type { Settings } from '../../shared/class/Settings';
    import { updateActivityListWritable } from '../../shared/store/activityStore';
    import { formatDateToYYYYMMDDNumber, getYesterday } from '../../shared/functions/UtilsDate';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher()
    
    export let activityList: Activity[] = [];
    export let settings: Settings;
    export let dateForm: Date = new Date();
    let activityForm: Activity;

    // UI Stuff
    let isOverridingExistingActivity: boolean = false;
    let isYesterdayFlag = false;
    let isActivityValid: boolean = false;

    $: if (dateForm) getActivityFromList(activityList, dateForm); 

    async function getActivityFromList(activityList: Activity[], date: Date) {
        if (!activityList || !date) return;

        const yyyymmdd = formatDateToYYYYMMDDNumber(date);
                
        const activity = activityList.find(a => a.date === yyyymmdd)

        if (activity) {
            activityForm = activity;
            isOverridingExistingActivity = true;
        } else {
            activityForm = buildActivityWithDate(date);
            isOverridingExistingActivity = false;
        }
    }

    function updateIsYesterdayFlag(dateForm) {
        if (dateForm === formatDateToYYYYMMDDNumber(getYesterday())) isYesterdayFlag = true;
        else isYesterdayFlag = false;
    }

    function updateDateForm(activityList, dateForm, activityForm) {
        const date = formatDateToYYYYMMDDNumber(dateForm);
        activityForm.date = date;
        updateIsYesterdayFlag(dateForm);
        getActivityFromList(activityList, dateForm)
    }

    async function saveActivity(activityForm) {
        await insertOrUpdateActivityInDatabase(activityForm);
        updateActivityListWritable(settings);
        dispatch("close");
    }

    async function deleteActivity(activityForm) {
        await deleteActivityFromDatabase(activityForm.date);
        updateActivityListWritable(settings)
        dispatch("close");
    }
</script>

<div class="flex flex-col items-center">
    <DateInput bind:date={dateForm} on:input={ e => updateDateForm(activityList, e.detail, activityForm) } />

    {#if activityForm && dateForm}
        <div class="mt-2">
            <InputNumber label="Weight" placeholder="Weight" className="input w-24  text-left"
                value={activityForm.weight} metric={settings.wm}
                on:input={e =>  activityForm.weight = e.detail.value}
                on:enterKey={() => saveActivity(activityForm)}
            />
        </div>
        
        <div class="mt-2">
            <InputNumber label="Calories" placeholder="Calories" className="input w-24 mt-2 text-left"
            value={activityForm.calories}
                on:input={e => activityForm.calories = e.detail.value}
                on:enterKey={() => saveActivity(activityForm)}
            />
        </div>

        <div class="mt-2">
            <InputNumber label="Steps" placeholder="Steps" className="input w-24 mt-2 text-left" 
                value={activityForm.steps}
                on:input={e => activityForm.steps = e.detail.value}
                on:enterKey={() => saveActivity(activityForm)}
            />
        </div>
    {/if}

    {#if isOverridingExistingActivity}
        <button class="btn btn-warning mt-2" disabled={isActivityValid}
            on:click={() => saveActivity(activityForm)}
        > Update Activity </button>

        <button class="btn btn-error mt-2"
            on:click={() => deleteActivity(activityForm)}
        > Delete Activity </button>

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
