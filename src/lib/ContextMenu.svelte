{#if showMenu}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="absolute" on:click={closeMenu} use:clickOutside on:click_outside={closeMenu} style="top: {p.y}px; left: {p.x}px;">
        <ul>
            <li><button class="btn btn-primary">Item 1</button></li>
        </ul>
    </div>
{/if}


<script lang="ts">
import { Position } from "../shared/class/Position";
  import { clickOutside } from "../shared/functions/Utilitary";

let p: Position = new Position(0,0);
let showMenu: boolean = false;

export async function show(x: number, y: number) {
    if (showMenu) {
        showMenu = false;
        // make the function wait for 0.1 second before proceding to open new menu
        await new Promise(res => setTimeout(res, 100));
    }
    
    p = new Position(x, y);
    showMenu = true;
}

function closeMenu() { showMenu = false }
</script>