<script lang="ts">
import type { Workout } from "../shared/class/Workout";
  import { downloadAsJson } from "../shared/functions/Utilitary";
import { workoutsData } from "../shared/store/saveStore";

let showMenu: boolean = false;

let workouts: Workout[];
$: { workouts = $workoutsData;}

function toggleMenu() { showMenu = !showMenu; }

function handleOnclickExportData(event) {
    downloadAsJson(workouts, 'data');
}
</script>



<div class="z-20 navbar bg-base-100 override-nav p-0 m-0">
    <div class="flex-none">
        <button class="btn btn-square btn-ghost" on:click={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
    </div>
</div>

<!-- content here -->
<ul class={`z-20 fixed left-0 h-full menu bg-base-200 p-0 w-4/5 [&_li>*]:rounded-none menu`} class:menu-expanded={showMenu}>
    <li><button class="btn btn-primary" on:click={handleOnclickExportData}>Export Data</button></li>
</ul>



<style>
.override-nav {
    min-height: 2.5rem !important;
    height: 6vh;
}

.menu {
    transition: transform 0.3s ease;
    transform: translateX(-100%);
}

.menu-expanded {
    transform: translateX(0%);
}

</style>