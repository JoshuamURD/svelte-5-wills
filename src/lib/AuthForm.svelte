<script lang="ts">
  import type { ActionData } from "../routes/(auth)/register/$types";
  import Button from "./Button.svelte";
  interface ComponentProps {
    isRegistration: boolean;
    form: ActionData;
  }
  let { isRegistration, form }: ComponentProps = $props();
  $inspect(form);
</script>

<div class="p-4 max-w-md bg-zinc-50 rounded-md shadow-lg">
  <h1 class="my-10 text-center text-5xl">
    {isRegistration ? "Register" : "Login"}
  </h1>
  {#if form && !form.success}
    {#each form?.errors as error}
      <p class="text-red-500 my-2">
        {error}
      </p>
    {/each}
  {/if}
  <form method="POST" class="flex flex-col gap-10">
    <input
      class="p-2 bg-white rounded-sm shadow-sm"
      type="email "
      placeholder="email"
      name="email"
      value={form?.email || ""}
      required
    />
    <input
      class="p-2 bg-white rounded-sm shadow-sm"
      type="password"
      placeholder="Password"
      name="password"
      value={form?.password || ""}
      required
    />
    {#if isRegistration}
      <input
        class="p-2 bg-white rounded-sm shadow-sm"
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={form?.confirmPassword || ""}
        required
      />
    {/if}
    <button type="submit" class="w-full p-2 bold bg-black text-white rounded-md"
      >{isRegistration ? "Register" : "Login"}</button
    >
  </form>
  <div class="my-4">
    <p class="my-2">
      {isRegistration ? "Already have an account?" : "Don't have an account?"}
    </p>
    <Button href={isRegistration ? "/login" : "/register"} type="primary">
      {isRegistration ? "Login" : "Register"}
    </Button>
  </div>
</div>
