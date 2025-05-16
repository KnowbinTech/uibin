<script lang="ts">
  import type { CardHeaderProps } from './types.js';

  type $$Props = CardHeaderProps;

  let className = '';
  export { className as class };

  // Generate combined classes
  $: headerClasses = [
    'flex flex-col space-y-1.5',
    className
  ].filter(Boolean).join(' ');
</script>

<div class={headerClasses} {...$$restProps}>
  <slot></slot>
</div> 