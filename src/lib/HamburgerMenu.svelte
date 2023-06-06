<div class="z-20 fixed navbar bg-base-100 override-nav">
    <div class="flex-none">
        <button class="btn btn-square btn-ghost" on:click={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
    </div>
</div>

<!-- content here -->
<ul class={`z-10 fixed left-0 top-10 h-full menu bg-base-200 p-0 w-4/5 [&_li>*]:rounded-none menu`} class:menu-expanded={showMenu}>
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
</ul>

<script lang="ts">
let showMenu: boolean = false;
let menuWidth: string = "w-0"

function toggleMenu(): void { 
    showMenu = !showMenu;
    // if (showMenu) menuWidth = "w-4/5";
    // else menuWidth = "w-0";
}
</script>


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