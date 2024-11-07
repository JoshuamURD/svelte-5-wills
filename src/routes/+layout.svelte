<script lang="ts">
	import '../app.css';
	import Header from '$lib/Layout/Header.svelte';
	import { invalidate } from '$app/navigation';
	import Nav from '$lib/Nav.svelte';
	import { getUserState, setUserState } from '$lib/state/user-state.svelte';


	
	//Props
	let { children, data } = $props();
	let { session, supabase, user} = $derived(data);
	
	//Context
	let userState = setUserState({session: data.session, supabase: data.supabase, user: data.user});
	let userContext = getUserState();

	$effect (() => {
		userState.updateState({session, supabase, user});
	})

	//Check current Supabase session
	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
 			}
		});

		return () => data.subscription.unsubscribe();
	});

	const NavItems = [
		{ link: "Home", href: "/" },
	];
</script>

<div class="max-w-lg mx-auto">
	<Nav userState={getUserState} items={NavItems} />
	<Header/>
	{@render children()}
</div>
