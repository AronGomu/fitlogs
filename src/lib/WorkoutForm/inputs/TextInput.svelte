<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { selectWholeTextOnFocus } from "../../../shared/functions/Utilitary";

  const dispatch = createEventDispatcher();

  export let placeholder: string = "";
  export let value: string;
  export let label: string = null;
  export let className: string = "";

  onMount(() => {
    className += " base-override";
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
  }

  // On input trigger the input event for this component.
  function handleInput(event: any) {
    // todo : check why reseting value then inputing again prevent new characters to be inputed
    dispatch("input", { input: event.data, value: event.target.value });
  }
</script>

<div class="form-control">
	{#if label}
		<span class="label-text">{label}</span>
	{/if}
	<input
	type="text"
	{placeholder}
	class={className}
	bind:value
	on:focus={handleFocus}
	on:keypress={handleKeyPress}
	on:input={handleInput}
	/>
</div>

<style>
	/** Style to add for the base input. */
	.base-override {
		height: 2rem;
		padding-left: 0.5rem !important;
		padding-right: 0.5rem !important;
	}
</style>
