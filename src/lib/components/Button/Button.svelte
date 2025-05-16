<script lang="ts">
  import type { ButtonProps } from './types.js';

  type $$Props = ButtonProps;

  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'md';
  export let disabled: $$Props['disabled'] = false;
  export let loading: $$Props['loading'] = false;
  export let type: $$Props['type'] = 'button';
  export let fullWidth: $$Props['fullWidth'] = false;
  export let leftIcon: $$Props['leftIcon'] = undefined;
  export let rightIcon: $$Props['rightIcon'] = undefined;
  export let href: $$Props['href'] = undefined;
  export let target: $$Props['target'] = undefined;
  export let rel: $$Props['rel'] = undefined;
  export let form: $$Props['form'] = undefined;
  export let as: $$Props['as'] = 'button';
  export let text: $$Props['text'] = '';

  let className = '';
  export { className as class };

  // Determine element to render based on href or as prop
  $: element = href ? 'a' : as;

  // Generate variant classes
  $: variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-md',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-md',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70 hover:shadow-md',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:shadow-md',
    ghost: 'hover:bg-accent hover:text-accent-foreground hover:shadow-sm',
    link: 'text-primary underline-offset-4 hover:underline',
    outline: 'border border-input bg-background hover:bg-accent/50 hover:text-accent-foreground hover:shadow-sm'
  };

  // Generate size classes
  $: sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 py-3 text-lg',
    icon: 'h-10 w-10'
  };

  // Generate combined classes
  $: buttonClasses = [
    // Base styles
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
    
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    
    // Size
    sizeClasses[size || 'md'],
    
    // Variant
    variantClasses[variant || 'default'],
    
    // Full width
    fullWidth && 'w-full',
    
    // Icon button (no text, only icon)
    size === 'icon' && 'p-0',
    
    // Custom classes
    className
  ].filter(Boolean).join(' ');

  // Pass-through attributes to exclude from $$restProps
  $: buttonProps = {
    type: element === 'button' ? type : undefined,
    href,
    target,
    rel,
    disabled: element === 'button' ? disabled : undefined,
    'aria-disabled': disabled,
    form,
    'data-loading': loading
  };
</script>

<svelte:element 
  this={element} 
  class={buttonClasses} 
  {...buttonProps} 
  {...$$restProps} 
  on:click
  on:focus
  on:blur
  on:keydown
  on:keyup
  on:mouseenter
  on:mouseleave
>
  {#if loading}
    <span class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
  {/if}
  
  {#if leftIcon && !loading}
    <span class="mr-2">
      <svelte:component this={leftIcon} class="h-4 w-4"></svelte:component>
    </span>
  {/if}
  
  <slot>{text}</slot>
  
  {#if rightIcon && !loading}
    <span class="ml-2">
      <svelte:component this={rightIcon} class="h-4 w-4"></svelte:component>
    </span>
  {/if}
</svelte:element> 