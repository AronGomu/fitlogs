<script lang="ts">
	import { navigate } from "svelte-routing";
	import { menuPath } from "../shared/store/menuPath";

	let showMenu: boolean = false;

	let mp: string = null;
	menuPath.subscribe((newMenuPath) => (mp = newMenuPath));

	function goto(path: string): void {
		navigate(path);
		showMenu = false;
	}

	function toggleMenu(): void {
		showMenu = !showMenu;
	}
</script>


<div class="navbar bg-primary navbar-override">
  <div class="flex-none">
    <button class="btn btn-xl btn-square btn-ghost" on:click={toggleMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
    </button>
  </div>

  <div class="flex">
    <a href="/" class="text-l mr-2">FitLogs</a>
	{#if mp}
		<a class="text-l mr-2">-</a>
		<a class="text-l">{mp}</a>
	{/if}
  </div>

  <!-- <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
    </button>
  </div> -->
</div>

<!-- <div class="z-20 navbar bg-base-100 override-nav p-0 m-0">
	<div>
		<div class="flex-none">
			<button class="btn btn-square btn-ghost" on:click={toggleMenu}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	
		<a href="/"><span class="primary-content">FitLogs</span></a>
	</div>

	<div class="w-full flex">
		
		<span class="ml-4 secondary-content">STUFF</span>
	</div>


</div> -->

<!-- content here -->


<ul
	class={`z-20 fixed left-0 h-full menu bg-base-200 p-0 w-4/5 [&_li>*]:rounded-none menu`}
	class:menu-expanded={showMenu}
>
	<li>
		<button class="btn btn-xl" on:click={() => { goto("/fitlogs") }}>
			<span>Home</span>
		</button>
	</li>

	<li>
		<button class="btn btn-xl" on:click={ () => { goto("/fitlogs/activity") }} >
			<span>Activity</span>
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
	.navbar-override {
		padding: 0px;
	}

	.menu {
		transition: transform 0.3s ease;
		transform: translateX(-100%);
	}

	.menu-expanded {
		transform: translateX(0%);
	}
</style>
