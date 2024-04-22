<script lang="ts">
	import type { ComponentType } from "svelte";

	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let component: ComponentType;
	export let show: boolean = false;

	function forwardEvent(event) {
		console.log(`${event.type} - ${event.detail}`)
		dispatch(event.type, event.detail);
	}

  // // Add event listeners for all events
  // onMount(() => {
  //   // Add event listener for all events
  //   Object.keys(window).forEach(eventName => {
  //     if (eventName.startsWith('on')) {
  //       window.addEventListener(eventName.slice(2), forwardEvent);
  //     }
  //   });
  // });
  //
  // // Remove event listeners when component is destroyed
  // onDestroy(() => {
  //   Object.keys(window).forEach(eventName => {
  //     if (eventName.startsWith('on')) {
  //       window.removeEventListener(eventName.slice(2), forwardEvent);
  //     }
  //   });
  // });

	

	function close() {
		show = false;
	}
</script>

{#if show}
	<div class="bg-black fixed top-0 left-0 h-full w-full flex items-center justify-center">
		<div class="modal-box bg-primary opacity-100">
			{#if component}
				<svelte:component this={component}/>
			{/if}
			<div class="flex justify-center">
				<button class="btn btn-error" on:click={() => close()}>Close</button>
			</div>
		</div>
	</div>

{/if}

