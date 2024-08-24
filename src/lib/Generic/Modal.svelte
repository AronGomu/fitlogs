<script lang="ts">
	import type { ComponentType } from "svelte";

	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let component: ComponentType;
	export let events: Record<string, string>;
	export let show: boolean = false;

	function bubbleToParent(event) {
		dispatch(event.type, event.detail);
	}

	function close() {
		show = false;
	}
</script>

{#if show}
	<div class="bg-black fixed top-0 left-0 h-full w-full flex items-center justify-center">
		<div class="modal-box bg-primary opacity-100 border border-red-900">
			{#if component}
				<svelte:component this={component} isInModal={true} on:bubbleToModal={(e) => bubbleToParent(e.detail)}>
				</svelte:component>
			{/if}
			<div class="flex justify-center">
				<button class="btn btn-error" on:click={() => close()}>Close</button>
			</div>
		</div>
	</div>

{/if}

