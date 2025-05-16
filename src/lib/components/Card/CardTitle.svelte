<script lang="ts">
  import type { CardTitleProps } from './types.js';

  type $$Props = CardTitleProps;

  export let as: $$Props['as'] = 'h3';

  let className = '';
  export { className as class };

  // Generate combined classes
  $: titleClasses = [
    'font-semibold text-lg tracking-tight',
    className
  ].filter(Boolean).join(' ');
</script>

<svelte:element 
  this={as} 
  class={titleClasses} 
  {...$$restProps}
>
  <slot></slot>
</svelte:element> 