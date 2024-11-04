<script lang="ts">
	import '../app.css';
	import Header from '$lib/Layout/Header.svelte';
	import { invalidate } from '$app/navigation';
	import Nav from '$lib/Nav.svelte';
	
	let { children, data } = $props();
	let { session, supabase, user} = $derived(data);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
 			}
		});

		return () => data.subscription.unsubscribe();
	});
	$inspect(session)


	const NavItems = [
		{ link: "home", href: "/" },
		{ link: "register", href: "/register" },
		{ link: "login", href: "/login" },
	];
</script>

<div class="max-w-lg mx-auto">
	<Nav items={NavItems} />
	<Header/>
	{@render children()}
</div>
