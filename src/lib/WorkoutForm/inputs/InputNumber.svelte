<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { WeightMetrics } from "../../../shared/enum/WeightMetrics";
  import { getReducedStringMetric, selectWholeTextOnFocus } from "../../../shared/functions/Utilitary";

  const dispatch = createEventDispatcher();

  /** Default placeholder of the input. */
  export let placeholder: string = "";
  /** Add css class to the input. */
  export let className: string = "";
  /** Text to put next to the number in the template. */
  export let metric: WeightMetrics = null;
  /** Value of the input. */
  export let value: number;

  onMount(() => {
    className += " base-override";
    if (metric) {
      // className += " override-metric-input";
    }
  });

  function handleFocus(event) {
    selectWholeTextOnFocus(event);
  }
  
  function handleKeyPress(event) {
    var theEvent = event || window.event;
    
    // Handle paste
    if (theEvent.type === "paste")
    key = event.clipboardData.getData("text/plain");
    else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /^[0-9]\d*$/;
    
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  function handleInput(event) {
    dispatch("input", event);
  }
</script>

{#if !metric}
  <input
    type="text"
    {placeholder}
    class={className}
    bind:value
    on:focus={handleFocus}
    on:keypress={handleKeyPress}
    on:input={handleInput}
  />
{:else if metric}
  <div class="relative">
    <input type="text" {placeholder} class={className} bind:value on:focus={handleFocus} on:keypress={handleKeyPress} on:input={handleInput} />
    {#if value}
      <div
        class="absolute top-0 right-0 bottom-0 left-1/2 bg-base-200 ml-0 rounded-r-lg px-2 flex items-center"
      >
        {getReducedStringMetric(metric)}
      </div>
    {/if}
  </div>
{/if}

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
