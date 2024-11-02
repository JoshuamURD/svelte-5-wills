<script lang="ts">
    import type { Snippet } from "svelte";
    interface BasicProps {
        children: Snippet;
        type: "button" | "primary" | "menu"
    }
    interface ButtonProps extends BasicProps {
        onclick: (e: MouseEvent) => void
        href?: never
    }
    interface Link extends BasicProps {
        href: string
        onclick?: never
        }
    
    type ComponentProps = Link | ButtonProps
    
    let {children, type, href,onclick, ...props }: ComponentProps = $props()
</script>


    
{#if href}
    <a {href} class="{type}" {...props}>    
        {@render children()}
    </a>
    {:else}
    <button class="button {type}" {onclick}>{children}</button>
{/if}
