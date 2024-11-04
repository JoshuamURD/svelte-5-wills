<script lang="ts">
    import type { Snippet } from "svelte";
    interface BasicProps {
        children: Snippet;
        type: "secondary" | "primary" | "menu"
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

    const typeClasses = {
        primary: "text-white bg-blue-500 hover:bg-blue-600",
        menu: "text-blue-500 hover:text-blue-600",
        secondary: "text-blue-500 hover:text-blue600"
    }
</script>


    
{#if href}
    <a {href} class={`px-4 py-2 rounded-md shadow-lg font-medium transition-colors ${typeClasses[type]}`} {...props}>    
        {@render children()}
    </a>
    {:else}
    <button class="button {type}" {onclick}>{children}</button>
{/if}
