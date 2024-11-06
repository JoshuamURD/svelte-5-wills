<script lang="ts">
  import type { User } from "@supabase/supabase-js";

  interface NavItem {
    link: string;
    href: string;
  }

  interface ComponentProps {
    items: NavItem[];
    activePath?: string;
    user: User | null;
    logout: () => void;
  }

  let { items, activePath, user, logout }: ComponentProps = $props();

  console.log("user: ", user);
</script>

<nav class="mt-4 flex flex-row gap-10 w-full bg-zinc-100 shadow-lg p-10">
  <div class="flex-none">
    <h1>WillsAI</h1>
  </div>
  <div class="flex-auto flex justify-end gap-8">
    {#each items as item}
      <a href={item.href} class="hover:text-blue-500 font-bold">{item.link}</a>
    {/each}
    {#if user}
      <button onclick={logout} class="hover:text-blue-500 font-bold"
        >Logout</button
      >
    {:else}
      <a href="/login" class="hover:text-blue-500 font-bold">Login</a>
      <a href="/register" class="hover:text-blue-500 font-bold">Register</a>
    {/if}
  </div>
</nav>
