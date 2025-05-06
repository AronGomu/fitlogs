<script lang="ts">
    export let data: string = "";
    export let label: string = "";
</script>

{#if data}
    <div>
        <span class="text-6xl text-accent ml-4">{data}</span>
        <span class="text-xl text-neutral-content mt-auto">{label}</span>
    </div>
{/if}