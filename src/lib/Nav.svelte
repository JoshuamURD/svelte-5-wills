<script lang="ts">
  interface NavItem {
    link: string;
    href: string;
  }

  interface ComponentProps {
    items: NavItem[];
    activePath?: string;
  }

  let { items, activePath }: ComponentProps = $props();
</script>

<nav class="mt-4 flex flex-row gap-10 w-full bg-zinc-100 shadow-lg p-10">
  <div class="flex-none">
    <h1>WillsAI</h1>
  </div>
  <div class="flex-auto flex justify-end gap-8">
    {#each items as item}
      <a href={item.href} class="hover:text-blue-500 font-bold">{item.link}</a>
    {/each}
  </div>
</nav>
