<script lang="ts">
	import { navigate } from "svelte-routing";
	import { menuPath } from "../shared/store/menuPath";

	let showMenu: boolean = false;

	let mp: string = null;
	menuPath.subscribe((newMenuPath) => (mp = newMenuPath));

	function goto(path: string) {
		navigate(path);
		toggleMenu();
	}

	function toggleMenu() {
		showMenu = !showMenu;
	}
</script>

<div class="z-20 navbar bg-base-100 override-nav p-0 m-0">

	<div class="flex-none">
		<button class="btn btn-square btn-ghost" on:click={toggleMenu}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>

	<a href="/"><span>FitLogs</span></a>

	{#if mp} <span class="menuPath-container">{mp}</span> {/if}

</div>

<!-- content here -->
<ul
	class={`z-20 fixed left-0 h-full menu bg-base-200 p-0 w-4/5 [&_li>*]:rounded-none menu`}
	class:menu-expanded={showMenu}
>
	<li>
		<button class="btn" on:click={() => { goto("/fitlogs") }}>
			<span>Home</span>
		</button>
	</li>

	<li>
		<button class="btn" on:click={ () => { goto("/fitlogs/activity") }} >
			<span>Activity List</span>
		</button>
	</li>

	<!-- <li>
		<button class="btn" on:click={() => { goto("/fitlogs/workouts") }}>
			<span>Workouts</span>
		</button>
	</li> -->
	
	<!-- <li>
		<button class="btn" on:click={ () => { goto("/fitlogs/lifts") }} >
			<span>Lifts</span>
		</button>
	</li> -->
	<!-- <li>
		<button class="btn" on:click={ () => { goto("/fitlogs/programs") }} >
			<span>Programs</span>
		</button>
	</li> -->
	<!-- <li>
		<button class="btn" on:click={ () => { goto("/fitlogs/settings") }} >
			<span>Settings</span>
		</button>
	</li> -->
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

	.menuPath-container {
		margin-left: 20px;
	}
</style>
