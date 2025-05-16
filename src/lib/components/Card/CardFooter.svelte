<script lang="ts">
  import type { CardFooterProps } from './types.js';

  type $$Props = CardFooterProps;

  let className = '';
  export { className as class };

  // Generate combined classes
  $: footerClasses = [
    'flex items-center pt-4',
    className
  ].filter(Boolean).join(' ');
</script>

<div class={footerClasses} {...$$restProps}>
  <slot></slot>
</div> 