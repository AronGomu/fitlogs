<script lang="ts">
  import { navigate } from "svelte-routing";
</script>

<div class="flex justify-center">
  <button class="btn btn-warning w-30 m-4" on:click={() => { navigate("/fitlogs/") }}>
    Back To Menu
  </button>
</div>