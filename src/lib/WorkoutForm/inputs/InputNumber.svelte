<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import {
    getReducedStringMetric,
    type WeightMetric,
  } from "../../../shared/enum/WeightMetrics";
  import { selectWholeTextOnFocus } from "../../../shared/functions/Utilitary";

  const dispatch = createEventDispatcher();

  export let label: string = null;
  /** Default placeholder of the input. */
  export let placeholder: string = "";
  /** Add css class to the input. */
  export let className: string = "";
  /** Text to put next to the number in the template. */
  export let metric: WeightMetric = null;
  /** Initial value of the input. */
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
    if (event.key === "Enter") {
      console.log("ENTER");
    }

    // Handle paste
    if (event.type === "paste") key = event.clipboardData.getData("text/plain");
    else {
      // Handle key press
      var key = event.keyCode || event.which;
      key = String.fromCharCode(key);
    }

    var regex = /^[0-9.]+$/;

    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  }

  // On input trigger the input event for this component.
  function handleInput(event: any) {
    // todo : check why reseting value then inputing again prevent new characters to be inputed
    console.log(`handleInput`)
    dispatch("input", { input: event.data, value: event.target.value });
  }
</script>

<div class="form-control">
  {#if label}
    <span class="label-text">{label}</span>
  {/if}
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
      <input
        type="text"
        {placeholder}
        class={className}
        bind:value
        on:focus={handleFocus}
        on:keypress={handleKeyPress}
        on:input={handleInput}
      />
      {#if value || value == 0}
        <div
          class="absolute top-0 right-0 bottom-0 left-1/2 bg-base-200 ml-0 rounded-r-lg px-2 flex items-center"
        >
          {getReducedStringMetric(metric)}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  /** Style to add for the base input. */
  .base-override {
    height: 2rem;
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
