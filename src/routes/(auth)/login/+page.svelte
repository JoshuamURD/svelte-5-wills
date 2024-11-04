<script lang="ts">
  import AuthForm from "$lib/AuthForm.svelte";

  let { form } = $props();
</script>

<div class="container m-10">
  <AuthForm {form} isRegistration={false} />
</div>
