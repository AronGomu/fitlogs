
{#if !metric}
<input type="text" placeholder={placeholder} class={className} 
bind:value={value} on:keypress={onKeyPress}
/>
{:else if metric}
<div class="relative">
    <input type="text" placeholder={placeholder} class={className}
    bind:value={value} on:keypress={onKeyPress}/>
    {#if value}
    <div class="absolute top-0 right-0 bottom-0 left-1/2 bg-base-200 ml-0 rounded-r-lg px-2 flex items-center">{getReducedStringMetric(metric)}</div>
    {/if}
</div>
{/if}
<script lang="ts">
  import { onMount } from "svelte";
  import type { WeightMetrics } from "../shared/enum/WeightMetrics";
  import { getReducedStringMetric } from "../shared/functions/Utilitary";

    export let placeholder: string = "";
    
    export let className: string = "";
    /** Text to put next to the number in the template. */
    export let metric: WeightMetrics = null;

    export let value: number;

    onMount(() => {
        className += " base-override";
        if (metric) {
            // className += " override-metric-input";
        }
    })

    function onKeyPress(event) {
        var theEvent = event || window.event;

        // Handle paste
        if (theEvent.type === 'paste') key = event.clipboardData.getData('text/plain');
        else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /^[0-9]\d*$/;

        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
        
    }
</script>


<style>
/** Style to add for the base input. */
.base-override {
    padding-left: 0.5rem !important; 
    padding-right: 0.5rem !important;
}

/** Style to add for the input showing the metric. */
/* .override-metric-input {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
} */

.override-metric-unit {
    /* background-color: hsl(var(--b1) / var(--tw-bg-opacity));
    border-top-right-radius: var(--rounded-btn, 0.5rem);
    border-bottom-right-radius: var(--rounded-btn, 0.5rem);
    mar */
}

</style>