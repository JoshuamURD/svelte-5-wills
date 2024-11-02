<script lang="ts">
  import AuthForm from "$lib/AuthForm.svelte";
  import Button from "$lib/Button.svelte";

  let { form } = $props();

  $inspect(form);

  let isRegistration = $state(true);

  function toggle() {
    isRegistration = !isRegistration;
  }
</script>

<div class="container m-10">
  <h1 class="text-5xl my-4">This is a community book review site</h1>

  <p class="my-10">
    A easily customisable Sveltekit app for communities to review books together
    and share common interests.
  </p>
  <AuthForm {isRegistration} {form} />
  <button onclick={toggle}> {isRegistration ? "Login" : "Register"} </button>
</div>
