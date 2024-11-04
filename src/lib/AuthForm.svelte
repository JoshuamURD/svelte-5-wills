<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ActionData } from "../routes/$types";
  interface ComponentProps {
    isRegistration: boolean;
    form: ActionData;
  }
  let { isRegistration, form }: ComponentProps = $props();
</script>

<div class="p-4 max-w-md bg-zinc-50 rounded-md shadow-lg">
  <h1 class="my-10 text-center text-5xl">
    {isRegistration ? "Register" : "Login"}
  </h1>
  {#if !form?.success}
    <p class="text-red-500">{form?.errors}</p>
  {/if}
  <form method="POST" class="flex flex-col gap-10">
    <input
      class="p-2 bg-white rounded-sm shadow-sm"
      type="text"
      placeholder="email"
      name="email"
      required
    />
    <input
      class="p-2 bg-white rounded-sm shadow-sm"
      type="password"
      placeholder="Password"
      name="password"
      required
    />
    {#if isRegistration}
      <input
        class="p-2 bg-white rounded-sm shadow-sm"
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        required
      />
    {/if}
    <button type="submit" class="w-full p-2 bold bg-black text-white rounded-md"
      >{isRegistration ? "Register" : "Login"}</button
    >
  </form>
</div>
