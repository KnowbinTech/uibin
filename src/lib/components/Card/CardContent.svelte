<script lang="ts">
  import type { CardContentProps } from './types.js';

  type $$Props = CardContentProps;

  let className = '';
  export { className as class };

  // Generate combined classes
  $: contentClasses = [
    'pt-0',
    className
  ].filter(Boolean).join(' ');
</script>

<div class={contentClasses} {...$$restProps}>
  <slot></slot>
</div> 